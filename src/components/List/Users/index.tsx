import Link from "next/link";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import styles from "./styles.module.scss";

export default function ListUsers() {
    const { showModal,onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> Nome </th>
                            <th> Email </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        <tr className={`${styles.item}`}>
                            <td>Marlene </td>
                            <td>marlene@gmail.com </td>
                            <td> </td>
                        </tr>
                    </tbody>


                </table>
            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/user`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>
            <ModalDelete nameDelete="Vestido Rozado" setIsOpen={onChangeStatusModal} isOpen={showModal}  />

        </>
    )
} 