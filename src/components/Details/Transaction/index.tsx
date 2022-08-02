
import moment from "moment";
import { Money } from "../../Trait/Money";
import styles from "./styles.module.scss";


interface InformationTransactionProps {
    transaction: Transaction | undefined;
}




export default function InformationTransaction({transaction}: InformationTransactionProps) {
    const type = transaction?.type == 'deposit' ? 'Deposito' : 'Saque';
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div>
                    <p> Valor : </p>
                    <span> <> <Money value={transaction?.value}/>  </>  </span>
                </div>
                <div>
                    <p>  Tipo : </p>
                    <span> {type} </span>
                </div>
                <div>
                    <p> Origem : </p>
                    <span> {transaction?.origin}  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> <> {moment(transaction?.created_at).format('DD-MM-yyyy HH:mm')}</> </span>
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