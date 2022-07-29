

import { MouseEventHandler, useState } from "react";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import FormRequestError from "../../Form/Error/FormRequestError";
import FormRequestSuccess from "../../Form/Success/FormRequestSuccess";
import { TailSpin } from "react-loader-spinner";


interface ModalChangeStatusProps {
    isOpen: boolean;
    setIsOpen: MouseEventHandler<HTMLAnchorElement>;
    route: string;
    elementId: string;
    elementName: string;
    resetList: string;
    status: string;
}

export default function ModalChangeStatus({ isOpen, setIsOpen, elementName, route, elementId,resetList,status }: ModalChangeStatusProps) {

    const [error, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const changeStatusELement = useMutation(async () => {
        try {
            const response = await api.patch(`${route}/${elementId}`, {
                status,
            });
            setSuccess(`${elementName} alterado com sucesso`);
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

    async function changeStatusElement(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);
        await changeStatusELement.mutateAsync();
        setLoading(false);
        setIsOpen(event);
    }


    return (
        <>
            {isOpen && (
                <div className={`${styles.modal}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.containerText}`}>
                            <p className={`${styles.title}`}>  VOCÊ DESEJA ALTERAR O STATUS DO ITEM:  </p>
                            <p className={`${styles.title}`}>   {elementName}</p>
                            <p className={`${styles.alert}`}>  (Essa ação é permanente e não reversível) </p>
                        </div>
                        <div className={`${styles.containerButtons}`}>
                            {loading ? (
                                <a className={` ${styles.yes}`}><TailSpin color="#FFFFFF" height={25} width={50} /></a>
                            ) : (
                                <a className={` ${styles.yes}`} onClick={changeStatusElement}> Sim </a>
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