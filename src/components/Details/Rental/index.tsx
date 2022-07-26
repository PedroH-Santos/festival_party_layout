
import styles from "./styles.module.scss";
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";


interface InformationDressProps {
    rental: Rental | undefined;
    origin: string;
}

export default function InformationRental({ rental,origin }: InformationDressProps) {
    const pathImage = (origin == 'dress') ? '/dress' : '/accessory';
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div className={`${styles.leftInformation}`}>
                    <div>
                        <p>  Valor : </p>
                        <span> <>R$ {rental?.value}</>  </span>
                    </div>
                    <div>
                        <p> Categoria : </p>
                        <span> {rental?.product.category?.name}  </span>
                    </div>
                    <div>
                        <p> Data Inicial : </p>
                        <span> <>{rental?.start_date} </> </span>
                    </div>
                    <div>
                        <p> Expectativa de Entrega : </p>
                        <span> <>{rental?.expected_delivery_date} </> </span>
                    </div>
                    <div>
                        <p> Data de Entrega : </p>
                        <span> <>{rental?.end_date}</>  </span>
                    </div>
                    <div>
                        <p> Criação : </p>
                        <span> <>{rental?.created_at}</>  </span>
                    </div>
                    <div>
                        <p> Descrição : </p>
                        <span> <>{rental?.description}</> </span>
                    </div>
                </div>
                <div className={`${styles.rightInformation}`}>
                    <div>
                        <p> Produto : </p>
                        <span> {rental?.product?.name}  </span>
                    </div>
                    <div>
                     <Image src={`http://localhost:3333/images/${pathImage}/${rental?.product?.images[0].image}`} alt={rental?.product?.images[0]?.id} width={240} height={240} />


                    </div>
                    <div>
                        <p>  Usuário : </p>
                        <span> {rental?.user?.name} </span>
                    </div>
                    {rental?.end_date != null ?
                        (
                            <div>
                                <FontAwesomeIcon icon={faLock} className={`${styles.closeStatus}`} />
                                <p>  Status : </p>
                                <span> Fechado </span>
                            </div>
                        )
                        :
                        (
                            <div>
                                <FontAwesomeIcon icon={faLockOpen} className={`${styles.openStatus}`} />
                                <p>  Status : </p>
                                <span> Aberto </span>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    )


}