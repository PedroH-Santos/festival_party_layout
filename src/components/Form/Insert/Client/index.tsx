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
import Phone from "../../Inputs/Phone";

const newClientFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
    phone: zod.string().min(1, 'Insira um telefone'),
    email: zod.string().email('Insira um email válido').min(1, 'Insira um email '),
})

interface CreateClientFormData {
    name: string;
    phone: string;
    email: string;
}


export default function FormClient() {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateClientFormData>({
        resolver: zodResolver(newClientFormValidationSchema),
        defaultValues: {
            phone: '',
            name: '',
            email: '',
        }
    });


    const createClient = useMutation(async (client: CreateClientFormData) => {
        try {
            const response = await api.post('/client', {
                ...client
            });

            setSuccess("Cliente cadastrado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients');
            reset();
        }
    }
    )

    async function onInsertNewClient(form: CreateClientFormData) {
        setLoading(true);
        const Client: CreateClientFormData = {
            name: form.name,
            phone: form.phone,
            email: form.email,
        }
        await createClient.mutateAsync(Client);
        setLoading(false);

    }
    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewClient)} method="post" >
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
                            <Phone text="Telefone" style="orange" name={'phone'} register={register} />
                            <LabelValidate message={errors.phone?.message} />
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

                    )}                </form>
            </div>
        </>
    )
} 