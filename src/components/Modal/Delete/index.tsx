

import { MouseEventHandler, useState } from "react";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import FormRequestError from "../../Form/Error/FormRequestError";
import FormRequestSuccess from "../../Form/Success/FormRequestSuccess";
import { TailSpin } from "react-loader-spinner";


interface ModalDeleteProps {
    isOpen: boolean;
    setIsOpen: MouseEventHandler<HTMLAnchorElement>;
    route: string;
    elementId: string;
    elementName: string;
    resetList: string;
}

export default function ModalDelete({ isOpen, setIsOpen, elementName, route, elementId,resetList }: ModalDeleteProps) {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const deleteELement = useMutation(async () => {
        try {
            const response = await api.delete(`${route}/${elementId}`);
            setSuccess(`${elementName} deletado com sucesso`);
            return response;
        } catch (error: any) {
            setErrors(error.response.data.message);

        }

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(resetList);

        }
    }
    )

    async function deleteElement(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);
        await deleteELement.mutateAsync();
        setLoading(false);
        setIsOpen(event);
    }


    return (
        <>
            {isOpen && (
                <div className={`${styles.modal}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.containerText}`}>
                            <p className={`${styles.title}`}>  VOCÊ DESEJA EXCLUIR O ITEM:  </p>
                            <p className={`${styles.title}`}>   {elementName}</p>
                            <p className={`${styles.alert}`}>  (Essa ação é permanente e não reversível) </p>
                        </div>
                        <div className={`${styles.containerButtons}`}>
                            {loading ? (
                                <a className={` ${styles.yes}`}><TailSpin color="#FFFFFF" height={25} width={50} /></a>
                            ) : (
                                <a className={` ${styles.yes}`} onClick={deleteElement}> Sim </a>
                            )}
                            <a className={` ${styles.no}`} onClick={setIsOpen}> Não </a>
                        </div>
                        <div className={`${styles.containerText}`}>
                            {error && (
                                <FormRequestError message={error} />
                            )}
                            {success && (
                                <FormRequestSuccess message={success} />
                            )}
                        </div>




                    </div>
                </div>
            )}
        </>

    )
}