import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import styles from "./styles.module.scss";

interface ListDressesProps {
    dresses: Dress[] | undefined;
}


export default function ListDresses({ dresses }: ListDressesProps) {

    const { showModal, onChangeStatusModal } = useModal();



    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> </th>
                            <th> Nome </th>
                            <th> Valor </th>
                            <th> Categoria </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {dresses?.map((dress) => {
                            const firstImage = (dress.images.length > 0) ? dress.images[0].image : '';
                            return (

                                <tr className={`${styles.item}`} key={dress.id}>
                                    <td> <Image src={`http://localhost:3333/images/${firstImage}`} alt={dress.images[0].id} width={60} height={60} /></td>
                                    <td>{dress.name} </td>
                                    <td>R$ {dress.price} </td>
                                    <td>{dress.category.name} </td>
                                    <td>
                                        <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <Link href={`/detail/dress/${dress.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>


                </table>

            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/dress`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

            <ModalDelete nameDelete="Vestido Rozado" setIsOpen={onChangeStatusModal} isOpen={showModal} />
        </>
    )
} 