import { faMagnifyingGlass, faPenToSquare, faTrashCan, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";
import ToolTip from "../../ToolTip";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import Image from "next/image";

interface ListDeliveriesProps {
    rentals: Rental[] | undefined;
    origin: string;
    resetList: string;
}

export default function ListDeliveries({rentals, origin,resetList }: ListDeliveriesProps) {
    const { showModal, onChangeStatusModal } = useModal();

 

    

    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> </th>
                            <th> Cliente </th>
                            <th> Valor </th>
                            <th> Data de Início </th>
                            <th> Data de Término </th>
                            <th> Ações </th>
                            <th>  </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {rentals?.map((rental) => {
                            const firstImage = (rental.product?.images?.length > 0) ? rental.product?.images[0]?.image : '';
                            const firstId = (rental.product?.images?.length > 0) ? rental.product?.images[0]?.id : 'Sem Foto';
                            const isLate = (new Date(rental.expected_delivery_date) < new Date());


                            return (
                                <tr className={`${styles.item}`} key={rental?.id}>

                                    <td> <Image src={`http://localhost:3333/images/${origin}/${firstImage}`} alt={firstId} width={60} height={60} /></td>
                                    <td> {rental.client.name} </td>
                                    <td><>R$ {rental.value}</> </td>
                                    <td><>{rental.start_date}</> </td>
                                    <td><>{rental.expected_delivery_date}</> </td>
                                    <td>

                                        <Link href={`/update/rental/${origin}/${rental.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>

                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${rental?.description}`} elementId={`${rental?.id}`} route={`/rental/${origin}`} resetList={`${resetList}`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                        <Link href={`/detail/rental/${origin}/${rental.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>

                                    </td>
                                    <td>
                                        <button className={`${styles.buttonMark}`}> Entregue </button>

                                        {isLate && (
                                            <ToolTip icon={faTriangleExclamation} text={'Atrasado'} />
                                        )}
                                    </td>
                                </tr>

                            )
                        })}


                    </tbody>


                </table>

            </div>



        </>
    )
} 