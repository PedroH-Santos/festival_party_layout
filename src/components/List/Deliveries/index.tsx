import { faMagnifyingGlass, faPenToSquare, faTrashCan, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";
import ToolTip from "../../ToolTip";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";

export default function ListDeliveries() {
    const { showModal,onChangeStatusModal } = useModal();




    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> </th>
                            <th> Cliente </th>
                            <th> Valor </th>
                            <th> Data de Entrega </th>
                            <th> Horário </th>
                            <th> Ações </th>
                            <th>  </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        <tr className={`${styles.item}`}>
                            <td> <img src="/images/colar.jpg" /></td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>
                                <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal}/>
                                <Link href={`/detail/rental`} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                </Link>

                            </td>
                            <td>
                                <button className={`${styles.buttonMark}`}> Entregue </button>

                                <ToolTip icon={faTriangleExclamation} text={'Atrasado'}/>
                            </td>


                        </tr>
                    </tbody>


                </table>
            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/rental`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

            <ModalDelete nameDelete="Vestido Rozado" setIsOpen={onChangeStatusModal} isOpen={showModal}  />

        </>
    )
} 