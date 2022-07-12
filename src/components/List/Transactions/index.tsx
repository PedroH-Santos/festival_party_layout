import Link from "next/link";
import styles from "./styles.module.scss";

export default function ListTransactions() {
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
                            <td> </td>
                        </tr>
                    </tbody>


                </table>
                <Link href={`/insert/transaction`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>
        </>
    )
} 