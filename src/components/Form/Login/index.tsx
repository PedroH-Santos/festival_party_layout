import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import Text from "../Inputs/Text";
import LabelValidate from "../Error/LabelValidate";
import Password from "../Inputs/Password";
import { TailSpin } from "react-loader-spinner";
import FormRequestError from "../Error/FormRequestError";
import FormRequestSuccess from "../Success/FormRequestSuccess";
import { AuthContext } from "../../../contexts/AuthContext";
import Body from "../../Body";

const newUserFormValidationSchema = zod.object({
    password: zod.string().min(1, 'Insira uma senha'),
    email: zod.string().email('Insira um email válido').min(1, 'Insira um email '),
})

interface LoginUserFormData {
    name: string;
    password: string;
    email: string;
}

export default function Login() {

    const [error, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<LoginUserFormData>({
        resolver: zodResolver(newUserFormValidationSchema),
        defaultValues: {
            password: '',
            email: '',
        }
    });




    async function onLoginUser(form: LoginUserFormData) {
        setLoading(true);
        try {
            await signIn(form);
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }
        setLoading(false);

    }
    return (
        <>
            <div className={`${styles.background}`}> </div>
            <Body>
                <div className={`${styles.contrainer}`}>
                    <div className={styles.logo}>
                        <Image src="/images/logo.png" alt="Logo" width={128} height={128} />
                    </div>
                    <form className={`${styles.form}`} onSubmit={handleSubmit(onLoginUser)} method="post" >
                        <div>
                            <Text text="E-mail" style="orange" name={'email'} register={register} />
                            <LabelValidate message={errors.email?.message} />
                        </div>
                        <div>
                            <Password text="Senha" style="orange" name={'password'} register={register} />
                            <LabelValidate message={errors.password?.message} />
                        </div>
                        {loading ? (
                            <button type="button" ><TailSpin color="#FFFFFF" height={25} width={50} /></button>
                        ) : (
                            <button type="submit">Logar</button>
                        )}
                        {error && (
                            <div className={`${styles.message}`}>
                                <FormRequestError message={error} />
                            </div>

                        )}

                    </form>

                </div>
        </Body>
        </>
    )
}