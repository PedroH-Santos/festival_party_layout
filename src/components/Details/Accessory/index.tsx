
import styles from "./styles.module.scss";
import Image from 'next/image'

export default function InformationAccessory() {

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.topInformation}`}>
                <Image src="/images/colar.jpg" alt="Logo" className={styles.image} width={360} height={360} />
                <div>
                    <h2> Próximos Aluguéis </h2>
                    <p> 25/05/2022 - Pedro </p>
                    <p> 25/05/2022 - Pedro </p>
                    <p> 25/05/2022 - Pedro </p>
                </div>
            </div>
            <div className={`${styles.footerInformation}`}>
                <div>
                    <p> Categoria : </p>
                    <span> Rozado  </span>
                </div>
                <div>
                    <p>  Preço : </p>
                    <span> R$ 13,50  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> 27/06/2022  </span>
                </div>
            </div>
        </div>
    )


}