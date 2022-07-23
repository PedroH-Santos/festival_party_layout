
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import Select from "../../Inputs/Select";

import styles from "./styles.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Text from "../../Inputs/Text";
import Number from "../../Inputs/Number";
import LabelValidate from "../../Error/LabelValidate";
import File from "../../Inputs/File";
import FormRequestError from "../../Error/FormRequestError";
import FormRequestSuccess from "../../Success/FormRequestSuccess";
import { TailSpin } from 'react-loader-spinner';

interface CreateAccessoryFormData {
    name: string;
    price: number;
    category_id: string;
    image: FileList;
}

interface FormAccessoryProps {
    categorys: AccessoryCategory[] | undefined,
    accessory: Accessory | undefined,
}



const updateAccessoryFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
    price: zod.number().nonnegative("O valor deve ser positivo").min(1, 'O valor deve ser maior do que 1'),
    category_id: zod.string().min(1, 'Escolha uma categoria').uuid('Id de categoria inválido'),
    image: zod.any(),
})


export default function FormUpdateAccessory({ categorys,accessory }: FormAccessoryProps) {


    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateAccessoryFormData>({
        resolver: zodResolver(updateAccessoryFormValidationSchema),
        defaultValues: {
            category_id: accessory?.category_id,
            name: accessory?.name,
            price:  accessory?.price,
            image: undefined,
        }
    });
    const updateAccessory = useMutation(async (accessoryUpdate: CreateAccessoryFormData) => {
        try {
            const response = await api.post('/accessory', {
                name: accessoryUpdate.name, price: accessoryUpdate.price, category_id: accessoryUpdate.category_id, id: accessory?.id
            });
            const newAccessory: Accessory = response.data;
            if(accessoryUpdate.image.length > 0) {
                const formData = new FormData();
                formData.append('images', accessoryUpdate.image[0]);
    
                await api.post(`accessory/images/${newAccessory.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            }
            setSuccess("Accessório atualizado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['accessory',{id: accessory?.id}]); 
        }
    }
    )
    async function onInsertNewAccessory(form: CreateAccessoryFormData) {
        setLoading(true);
        const accessoryUpdate: CreateAccessoryFormData = {
            name: form.name,
            category_id: form.category_id,
            price: form.price,
            image: form.image
        }
        await updateAccessory.mutateAsync(accessoryUpdate);
        setLoading(false);

    }


    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewAccessory)} method="post" encType="multipart/form-data">
                    <div className={`${styles.inputImage}`} >

                        <File name={"image"} text={"Imagem"} register={register} currentValue={accessory?.images[0].image} />
                        <LabelValidate message={errors.image?.message} />
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>

                            <Select options={categorys} text={"Categoria"} name="category_id" register={register} control={control} currentValue={accessory?.category_id} />
                            <LabelValidate message={errors.category_id?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Text text="Nome" style="orange" name={'name'} register={register} />
                            <LabelValidate message={errors.name?.message} />

                        </div>
                        <div>
                            <Number text="Preço" style="orange" name={'price'} register={register} />
                            <LabelValidate message={errors.price?.message} />

                        </div>


                    </div>
                    {loading ? (
                        <button type="button" className={`${styles.insertNew}`}><TailSpin color="#FFFFFF" height={25} width={50} /></button>
                        ) : (
                        <button type="submit" className={`${styles.insertNew}`}>Atualizar</button>
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