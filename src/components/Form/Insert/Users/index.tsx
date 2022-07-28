import Text from "../../Inputs/Text";
import Input from "../../Inputs/Text";
import styles from "./styles.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import LabelValidate from "../../Error/LabelValidate";
import { TailSpin } from "react-loader-spinner";
import FormRequestError from "../../Error/FormRequestError";
import FormRequestSuccess from "../../Success/FormRequestSuccess";
import Password from "../../Inputs/Password";
import Email from "../../Inputs/Email";

const newUserFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
    password: zod.string().min(1, 'Insira uma senha'),
    email: zod.string().email('Insira um email válido').min(1, 'Insira um email '),
})

interface CreateUserFormData {
    name: string;
    password: string;
    email: string;
}


export default function FormUser() {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateUserFormData>({
        resolver: zodResolver(newUserFormValidationSchema),
        defaultValues: {
            password: '',
            name: '',
            email: '',
        }
    });


    const createUser = useMutation(async (user: CreateUserFormData) => {
        try {
            const response = await api.post('/user', {
                ...user
            });

            setSuccess("Usuário cadastrado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            reset();
        }
    }
    )

    async function onInsertNewUser(form: CreateUserFormData) {
        setLoading(true);
        const user: CreateUserFormData = {
            name: form.name,
            password: form.password,
            email: form.email,
        }
        await createUser.mutateAsync(user);
        setLoading(false);

    }
    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewUser)} method="post" >
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Text text="Nome" style="orange" name={'name'} register={register} />
                            <LabelValidate message={errors.name?.message} />
                        </div>
                        <div>
                            <Text text="E-mail" style="orange" name={'email'} register={register} />
                            <LabelValidate message={errors.email?.message} />
                        </div>

                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Password text="Senha" style="orange" name={'password'} register={register} />
                            <LabelValidate message={errors.password?.message} />
                        </div>
                    </div>

                    {loading ? (
                        <button type="button" className={`${styles.insertNew}`}><TailSpin color="#FFFFFF" height={25} width={50} /></button>
                    ) : (
                        <button type="submit" className={`${styles.insertNew}`}>Cadastrar</button>
                    )}
                    {error && (
                        <div className={`${styles.message}`}>
                            <FormRequestError message={error} />
                        </div>

                    )}

                    {success && (
                        <div className={`${styles.message}`}>
                            <FormRequestSuccess message={success} />
                        </div>

                    )}
                </form>
            </div>
        </>
    )
} 