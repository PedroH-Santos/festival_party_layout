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
                            <td> </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td>123 </td>
                            <td> </td>
                        </tr>
                    </tbody>


                </table>
            </div>
        </>
    )
} 