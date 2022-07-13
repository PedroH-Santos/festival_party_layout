import Link from "next/link";
import styles from "./styles.module.scss";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ListAccessorys() {
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
                            <td><img src="/images/colar.jpg" /> </td>
                            <td>123 </td>
                            <td>R$ 20,00 </td>
                            <td>Listrado </td>
                            <td>
                
                                    <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                    <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} />
                                    <Link href={"/detail/accessory"}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                </Link>
                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
            <div className={`${styles.button}`}>

                <Link href={`/insert/accessory`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 