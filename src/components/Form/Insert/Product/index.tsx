
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
}



const newProductFormValidationSchema = zod.object({
    name: zod.string().min(1, 'Insira um nome válido'),
    price: zod.string().min(1, 'O valor deve ser maior do que 1'),
    category_id: zod.string().min(1, 'Escolha uma categoria').uuid('Id de categoria inválido'),
    image: zod.any().refine((files) => { return files?.length == 1; }, "Escolha uma imagem."),
})


export default function FormProduct({ categorys }: FormProductProps) {


    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateProductFormData>({
        resolver: zodResolver(newProductFormValidationSchema),
        defaultValues: {
            category_id: '',
            name: '',
            price: '',
            image: undefined,
        }
    });
    const createProducts = useMutation(async (Product: CreateProductFormData) => {
        try {
            const response = await api.post('/product', {
                name: Product.name, price: Product.price, category_id: Product.category_id
            });
            const newProduct: Product = response.data;
            const formData = new FormData();
            formData.append('images', Product.image[0]);

            await api.post(`product/images/${newProduct.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            setSuccess("Produto cadastrado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('product');
            reset();
        }
    }
    )

    async function onInsertNewProduct(form: CreateProductFormData) {
        setLoading(true);
        const Product: CreateProductFormData = {
            name: form.name,
            category_id: form.category_id,
            price: form.price,
            image: form.image
        }
        await createProducts.mutateAsync(Product);
        setLoading(false);

    }


    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewProduct)} method="post" encType="multipart/form-data">
                    <div className={`${styles.inputImage}`} >

                        <File name={"image"} text={"Imagem"} register={register} />
                        <LabelValidate message={errors.image?.message} />
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>

                            <Select options={categorys} text={"Categoria"} name="category_id" register={register} control={control} />
                            <LabelValidate message={errors.category_id?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Text text="Nome" style="orange" name={'name'} register={register} />
                            <LabelValidate message={errors.name?.message} />

                        </div>
                        <div>
                            <Price text="Preço" style="orange" name={'price'} register={register} control={control} />
                            <LabelValidate message={errors.price?.message} />

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