import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function ListRentals() {
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
                                <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} />
                                <Link href={`/detail/rental`} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                </Link>

                            </td>
                            <td>
                                <button className={`${styles.buttonMark}`}> Agendado </button>
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
        </>
    )
} 