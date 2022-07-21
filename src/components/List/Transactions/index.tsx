import Link from "next/link";
import styles from "./styles.module.scss";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";


export default function ListTransactions() {
    const { showModal,onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> Tipo </th>
                            <th> Valor </th>
                            <th> Origem </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        <tr className={`${styles.item}`}>
                            <td>Deposit </td>
                            <td>R$20,O0 </td>
                            <td>RENTAL_DRESS </td>
                            <td>
                                <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal}/>
                                <Link href={`/detail/transaction`} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                </Link>

                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/transaction`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>
            <ModalDelete nameDelete="Vestido Rozado" setIsOpen={onChangeStatusModal} isOpen={showModal}  />

        </>
    )
} 