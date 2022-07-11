import styles from "./styles.module.scss";

export default function ListRentals() {
    return (
        <>
            <div className={`${styles.container}`}> 
                <table>
                    <thead> 
                        <th> </th> 
                        <th> Cliente </th>
                        <th> Valor </th>
                        <th> Data de Entrega </th>
                        <th> Horário </th>
                        <th> Ações </th>
                        <th>  </th>

                    </thead>
                </table>
            </div>
        </>
    )
} 