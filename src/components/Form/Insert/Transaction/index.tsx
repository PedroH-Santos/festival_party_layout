import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectTrait from "../../Inputs/Select";
import Input from "../../Inputs/Text";
import TextArea from "../../Inputs/TextArea";
import styles from "./styles.module.scss";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import Select from "../../Inputs/Select";
import Number from "../../Inputs/Number";
import LabelValidate from "../../Error/LabelValidate";
import FormRequestSuccess from "../../Success/FormRequestSuccess";
import FormRequestError from "../../Error/FormRequestError";
import { TailSpin } from "react-loader-spinner";
import Price from "../../Inputs/Price";




interface FormTransactionProps {
    typeOptions: Option[],
    originOptions: Option[],
}

interface CreateTransactionFormData {
    value: string;
    type: string;
    origin: string;
    description: string;
}

const newTransactionFormValidationSchema = zod.object({
    value: zod.string().min(1, 'Digite um valor para a transação'),
    type: zod.string().min(1, 'Selecione um tipo para a transação'),
    origin: zod.string().min(1, 'Selecione a origem da transação'),
    description: zod.string().min(1, 'Preencha uma descrição '),

})

export default function FormTransaction({ typeOptions, originOptions }: FormTransactionProps) {
    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(newTransactionFormValidationSchema),
        defaultValues: {
            origin: '',
            type: '',
            value: '',
            description: '',
        }
    });



    const createTransaction = useMutation(async (transaction: CreateTransactionFormData) => {
        try {
            const response = await api.post('/transaction', {
                ...transaction
            });
            setSuccess("Transação cadastrada com sucesso !");
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);
            reset();
        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('transaction');
            reset();
        }
    }
    )

    async function onInsertNewTransaction(form: CreateTransactionFormData) {
        setLoading(true);
        


        
        const transaction: CreateTransactionFormData = {
            value: form.value,
            type: form.type,
            origin: form.origin,
            description: form.description
        }
        await createTransaction.mutateAsync(transaction);
        setLoading(false);

    }



    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit(onInsertNewTransaction)} method="post" >
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Select options={originOptions} text={"Origem"} name="origin" register={register} control={control} />
                            <LabelValidate message={errors.origin?.message} />

                        </div>
                        <div>
                            <Select options={typeOptions} text={"Tipo"} name="type" register={register} control={control} />
                            <LabelValidate message={errors.type?.message} />

                        </div>
                        

                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Price text={"Valor"} name="value" style="orange" register={register} control={control} />
                            <LabelValidate message={errors.value?.message} />
                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <TextArea name={'description'} text="Descrição" register={register} />
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