import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import Pagination from "../../Pagination";
import styles from "./styles.module.scss";


interface ListUsersProps {
    users: User[] | undefined;
    pagination: Pagination | undefined;
    setFilter: Function;
}


export default function ListUsers({ users, pagination,setFilter }: ListUsersProps) {
    const { showModal, onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <div>
                    <input type="text" onChange={(e) => setFilter(e.target.value)}/>
                </div>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> Nome </th>
                            <th> Email </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {users?.map((user) => {
                            return (
                                <tr className={`${styles.item}`} key={user.id}>
                                    <td>{user.name} </td>
                                    <td>{user.email} </td>
                                    <td>

                                        <Link href={`/update/user/${user.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>
                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${user?.name}`} elementId={`${user?.id}`} route={`/user`} resetList={`users`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>


                </table>

                <Pagination pagination={pagination} />


            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/user`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 