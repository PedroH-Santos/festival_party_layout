
import styles from "./styles.module.scss";


interface InformationTransactionProps {
    transaction: Transaction | undefined;
}

export default function InformationTransaction({transaction}: InformationTransactionProps) {

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div>
                    <p> Valor : </p>
                    <span> <>{transaction?.value}</>  </span>
                </div>
                <div>
                    <p>  Tipo : </p>
                    <span> {transaction?.type} </span>
                </div>
                <div>
                    <p> Origem : </p>
                    <span> {transaction?.origin}  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> <>{transaction?.created_at}</> </span>
                </div>

            </div>
            <div className={`${styles.information}`}>
                <div>
                    <p> Descrição : </p>
                    <span> {transaction?.description}  </span>
                </div>
            </div>
        </div>
    )


}