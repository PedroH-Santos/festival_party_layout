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

const newCategoryFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
})

interface CreateCategoryFormData {
    name: string;
}




export default function FormCategory() {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateCategoryFormData>({
        resolver: zodResolver(newCategoryFormValidationSchema),
        defaultValues: {
            name: '',
        }
    });


    const createCategory = useMutation(async (category: CreateCategoryFormData) => {
        try {
            const response = await api.post(`/product/category`, {
                ...category
            });

            setSuccess("Categoria cadastrado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('categorys');
            reset();
        }
    }
    )

    async function onInsertNewCategory(form: CreateCategoryFormData) {
        setLoading(true);
        const Category: CreateCategoryFormData = {
            name: form.name,
        }
        await createCategory.mutateAsync(Category);
        setLoading(false);

    }
    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewCategory)} method="post" >
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Text text="Nome" style="orange" name={'name'} register={register} />
                            <LabelValidate message={errors.name?.message} />
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