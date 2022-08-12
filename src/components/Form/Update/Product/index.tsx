
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
import Price from "../../Inputs/Price";

interface CreateProductFormData {
    name: string;
    price: string;
    category_id: string;
    image: FileList;
}

interface FormProductProps {
    categorys: ProductCategory[] | undefined,
    product: Product | undefined,
}



const updateProductFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
    price: zod.string().min(1, 'O valor deve ser maior do que 1'),
    category_id: zod.string().min(1, 'Escolha uma categoria').uuid('Id de categoria inválido'),
    image: zod.any(),
})


export default function FormUpdateProduct({ categorys,product }: FormProductProps) {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateProductFormData>({
        resolver: zodResolver(updateProductFormValidationSchema),
        defaultValues: {
            category_id: product?.category_id,
            name: product?.name,
            price:  product?.price.toString().replace('.', ','),
            image: undefined,
        }
    });
    const updateProduct = useMutation(async (ProductUpdate: CreateProductFormData) => {
        try {
            const response = await api.post('/product', {
                name: ProductUpdate.name, price: ProductUpdate.price, category_id: ProductUpdate.category_id, id: product?.id
            });
            const newProduct: Product = response.data;
            if(ProductUpdate.image.length > 0) {
                const formData = new FormData();
                formData.append('images', ProductUpdate.image[0]);
    
                await api.post(`Product/images/${newProduct.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            }
            setSuccess("Produto atualizado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['product',{id: product?.id}]); 
        }
    }
    )
    async function onInsertNewProduct(form: CreateProductFormData) {
        setLoading(true);

        const ProductUpdate: CreateProductFormData = {
            name: form.name,
            category_id: form.category_id,
            price: form.price,
            image: form.image
        }
        await updateProduct.mutateAsync(ProductUpdate);
        setLoading(false);

    }


    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewProduct)} method="post" encType="multipart/form-data">
                    <div className={`${styles.inputImage}`} >

                        <File name={"image"} text={"Imagem"} register={register} currentValue={product?.images[0].image} />
                        <LabelValidate message={errors.image?.message} />
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>

                            <Select options={categorys} text={"Categoria"} name="category_id" register={register} control={control} currentValue={product?.category_id} />
                            <LabelValidate message={errors.category_id?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Text text="Nome" style="orange" name={'name'} register={register} />
                            <LabelValidate message={errors.name?.message} />

                        </div>
                        <div>
                            <Price text="Preço" style="orange" name={'price'} register={register} control={control}/>
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