
import styles from "./styles.module.scss";
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export default function InformationDress() {

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div className={`${styles.leftInformation}`}>
                    <div>
                        <p>  Valor : </p>
                        <span> R$ 13,50  </span>
                    </div>
                    <div>
                        <p> Categoria : </p>
                        <span> Rozado  </span>
                    </div>
                    <div>
                        <p> Data Inicial : </p>
                        <span> 27/06/2022  </span>
                    </div>
                    <div>
                        <p> Expectativa de Entrega : </p>
                        <span> 27/06/2022  </span>
                    </div>
                    <div>
                        <p> Data de Entrega : </p>
                        <span> 27/06/2022  </span>
                    </div>
                    <div>
                        <p> Criação : </p>
                        <span> 27/06/2022  </span>
                    </div>
                    <div>
                        <p> Descrição : </p>
                        <span> Aluguél feito  </span>
                    </div>
                </div>
                <div className={`${styles.rightInformation}`}>
                    <div>
                        <p> Produto : </p>
                        <span> Vestido Rozado  </span>
                    </div>
                    <div>
                        <Image src="/images/colar.jpg" alt="Logo" className={styles.image} width={240} height={240} />

                    </div>
                    <div>
                        <p>  Usuário : </p>
                        <span> Marlene </span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock}  className={`${styles.closeStatus}`}/>
                        <p>  Status : </p>
                        <span> Fechado </span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLockOpen} className={`${styles.openStatus}`} />
                        <p>  Status : </p>
                        <span> Aberto </span>
                    </div>
                </div>
            </div>
        </div>
    )


}