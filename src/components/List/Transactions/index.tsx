import Link from "next/link";
import styles from "./styles.module.scss";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import { Money } from "../../Trait/Money";
import Search from "../../Search";
import Pagination from "../../Pagination";
import { Filters } from "../../../services/hooks/useFilter";

interface ListTransactionsProps {
    transactions: Transaction[] | undefined;
    pagination: Pagination | undefined;
    filters: Filters[];
    changeValueFilter: Function;
}


export default function ListTransactions({ transactions, pagination, filters, changeValueFilter }: ListTransactionsProps) {
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
                            <th> Tipo </th>
                            <th> Valor </th>
                            <th> Origem </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {transactions?.map(transaction => {
                            return (
                                <>
                                    <tr className={`${styles.item}`}>
                                        <td>{transaction.type} </td>
                                        <td> <> <Money value={transaction?.value} /> </></td>
                                        <td>{transaction.origin} </td>
                                        <td>
                                            <Link href={`/update/transaction/${transaction.id}`}>
                                                <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                            </Link>
                                            <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                            <ModalDelete elementName={transaction.id} elementId={transaction.id} isOpen={showModal} resetList={"transactions"} route={'/transaction'} setIsOpen={onChangeStatusModal} />

                                            <Link href={`/detail/transaction/${transaction.id}`} >
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                            </Link>

                                        </td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>


                </table>
                <Pagination pagination={pagination} filters={filters} />

            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/transaction`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 