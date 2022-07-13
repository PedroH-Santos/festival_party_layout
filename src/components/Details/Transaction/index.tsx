
import styles from "./styles.module.scss";

export default function InformationDress() {

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div>
                    <p> Valor : </p>
                    <span> R$ 13,90  </span>
                </div>
                <div>
                    <p>  Tipo : </p>
                    <span> Depósito </span>
                </div>
                <div>
                    <p> Origem : </p>
                    <span> Vestidos  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> 27/06/2022  </span>
                </div>

            </div>
            <div className={`${styles.information}`}>
                <div>
                    <p> Descrição : </p>
                    <span> Aluguél feito  </span>
                </div>
            </div>
        </div>
    )


}