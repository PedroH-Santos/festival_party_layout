import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function ListDresses() {
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
                        <tr className={`${styles.item}`}>
                            <td> <img src="/images/colar.jpg" /></td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>
                                <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} />
                                <Link href={"/detail/dress"}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                </Link>
                            </td>


                        </tr>

                    </tbody>


                </table>

            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/dress`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>
        </>
    )
} 