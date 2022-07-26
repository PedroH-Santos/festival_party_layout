import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import Input from "../../Inputs/Text";
import TextArea from "../../Inputs/TextArea";
import styles from "./styles.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import Number from "../../Inputs/Number";
import SelectTrait from "../../Inputs/Select";
import DateInput from "../../Inputs/Date";
import LabelValidate from "../../Error/LabelValidate";
import FormRequestError from "../../Error/FormRequestError";
import FormRequestSuccess from "../../Success/FormRequestSuccess";
import { TailSpin } from "react-loader-spinner";

interface CreateRentalFormData {
    value: Number;
    accessory_id: string;
    user_id: string;
    client_id: string;
    description: string;
    start_date: Date;
    expected_delivery_date: Date;
}

interface FormRentalProps {
    products: Dress[] | Accessory[] | undefined,
    users: User[] | undefined,
    clients: Client[] | undefined,
    origin: string;
}

const newDressFormValidationSchema = zod.object({
    value: zod.number().nonnegative("O valor deve ser positivo").min(1, 'O valor deve ser maior do que 1'),
    accessory_id: zod.string().uuid('Escolha um vestido').min(1, 'Escolha um vestido'),
    user_id: zod.string().uuid('Escolha um usuário').min(1, 'Escolha um usuário'),
    client_id: zod.string().uuid('Escolha um cliente').min(1, 'Escolha um cliente'),
    description: zod.string().min(1, 'Preencha a descrição'),
    start_date: zod.preprocess((date) => new Date(zod.string().parse(date)), zod.date({required_error: 'Escolha uma data'})),
    expected_delivery_date: zod.preprocess((date) => new Date(zod.string().parse(date)), zod.date({required_error: 'Escolha uma data'})),

})


export default function FormRental({ products, users, clients,origin }: FormRentalProps) {
    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateRentalFormData>({
        resolver: zodResolver(newDressFormValidationSchema),
        defaultValues: {
            value: 0,
            accessory_id: '',
            user_id: '',
            client_id: '',
            description: '',
            start_date: undefined,
            expected_delivery_date: undefined,
        }
    });



    const createDresss = useMutation(async (rental: CreateRentalFormData) => {
        try { 
            const response = await api.post(`/rental/${origin}`, {
                ...rental
            });

            setSuccess("Aluguél cadastrado com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('rental');
            reset();
        }
    }
    )

    async function onInsertNewRental(form: CreateRentalFormData) {
        setLoading(true);
        const rental: CreateRentalFormData = {
            value: form.value,
            client_id: form.client_id,
            accessory_id: form.accessory_id,
            user_id: form.user_id,
            description: form.description,
            expected_delivery_date: form.expected_delivery_date,
            start_date: form.start_date
        }
        await createDresss.mutateAsync(rental);
        setLoading(false);

    }


    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewRental)} method="post" >
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Number name="value" text="Valor" register={register} style="orange" />
                            <LabelValidate message={errors.value?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <SelectTrait text="Produto" name="accessory_id" options={products} register={register} control={control} />
                            <LabelValidate message={errors.accessory_id?.message} />

                        </div>
                        <div>
                            <SelectTrait text="Vendedor" name="user_id" options={users} register={register} control={control} />
                            <LabelValidate message={errors.user_id?.message} />

                        </div>
                        <div>
                            <SelectTrait text="Clientes" name="client_id" options={clients} register={register} control={control} />
                            <LabelValidate message={errors.client_id?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <DateInput name="start_date" text="Dia de início" register={register} />
                            <LabelValidate message={errors.start_date?.message} />

                        </div>
                        <div>
                            <DateInput name="expected_delivery_date" text="Dia de Término" register={register} />
                            <LabelValidate message={errors.expected_delivery_date?.message} />

                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <TextArea name="description" text="Descrição" register={register} />
                            <LabelValidate message={errors.description?.message} />

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