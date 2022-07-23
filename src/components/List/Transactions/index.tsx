import Link from "next/link";
import styles from "./styles.module.scss";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";

interface ListTransactionsProps {
    transactions: Transaction[] | undefined;
}


export default function ListTransactions({ transactions }: ListTransactionsProps) {
    const { showModal, onChangeStatusModal } = useModal();

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
                        {transactions?.map(transaction => {
                            return (
                                <>
                                    <tr className={`${styles.item}`}>
                                        <td>{transaction.type} </td>
                                        <td> <>R$ {transaction.value} </></td>
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
            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/transaction`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 