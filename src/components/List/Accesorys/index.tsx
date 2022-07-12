import Link from "next/link";
import styles from "./styles.module.scss";

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
                            <th>  </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        <tr className={`${styles.item}`}>
                            <td> </td>
                            <td>123 </td>
                            <td>R$ 20,00 </td>
                            <td>Listrado </td>
                            <td>123 </td>
                            <td> </td>
                        </tr>
                    </tbody>


                </table>
                <Link href={`/insert/accessory`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 