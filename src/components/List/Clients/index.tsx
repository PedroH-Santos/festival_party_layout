import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Filters } from "../../../services/hooks/useFilter";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import Pagination from "../../Pagination";
import Search from "../../Search";
import styles from "./styles.module.scss";


interface ListClientsProps {
    clients: Client[] | undefined;
    pagination: Pagination | undefined;
    filters: Filters[],
    changeValueFilter: Function,
}



export default function ListClient({ clients, pagination, filters, changeValueFilter }: ListClientsProps) {
    const { showModal, onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.containerSearch}`}>
                    <Search filters={filters} changeValueFilter={changeValueFilter} />
                </div>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> Nome </th>
                            <th> Email </th>
                            <th> Telefone </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {clients?.map((client) => {
                            return (
                                <tr className={`${styles.item}`} key={client.id}>
                                    <td>{client.name} </td>
                                    <td>{client.email} </td>
                                    <td>{client.phone} </td>
                                    <td>

                                        <Link href={`/update/client/${client.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>
                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${client?.name}`} elementId={`${client?.id}`} route={`/client`} resetList={`clients`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>


                </table>
                <Pagination pagination={pagination} filters={filters} />

            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/client`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 