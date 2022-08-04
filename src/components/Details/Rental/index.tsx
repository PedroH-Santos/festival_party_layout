
import styles from "./styles.module.scss";
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Money } from "../../Trait/Money";


interface InformationProductProps {
    rental: Rental | undefined;
}

export default function InformationRental({ rental }: InformationProductProps) {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.information}`}>
                <div className={`${styles.leftInformation}`}>
                    <h3> Detalhes do Aluguél </h3>
                    <div>
                        <p>  Valor : </p>
                        <span> <><Money value={rental?.value}/> </>  </span>
                    </div>
                    <div>
                        <p> Data Inicial : </p>
                        <span> <>{moment(rental?.start_date).format('DD-MM-yyyy HH:mm')} </> </span>
                    </div>
                    <div>
                        <p> Expectativa de Entrega : </p>
                        <span> <>{moment(rental?.expected_delivery_date).format('DD-MM-yyyy HH:mm')}</> </span>
                    </div>
                    <div>
                        <p> Data de Entrega : </p>
                        <span> <>{(rental?.end_date) ? moment(rental?.end_date).format('DD-MM-yyyy HH:mm') : 'Ainda não finalizado'}</>  </span>
                    </div>
                    <div>
                        <p> Criação : </p>
                        <span> <>{moment(rental?.created_at).format('DD-MM-yyyy HH:mm')}</>  </span>
                    </div>
                    <div>
                        <p> Descrição : </p>
                        <span> <>{rental?.description}</> </span>
                    </div>
                    <div>
                        <p>  Usuário : </p>
                        <span> {rental?.user?.name} </span>
                    </div>

                    <div>
                        <p>  Status : </p>
                        {rental?.end_date != null ?
                            (
                                <>
                                    <FontAwesomeIcon icon={faLock} className={`${styles.closeStatus}`} />
                                    <span> Fechado </span>
                                </>
                            )
                            :
                            (
                                <>
                                    <FontAwesomeIcon icon={faLockOpen} className={`${styles.openStatus}`} />
                                    <span> Aberto </span>
                                </>
                            )
                        }
                    </div>



                    <h3> Pagamentos </h3>
                    {rental?.transactions.map(transaction => {
                        return (
                            <>
                                <div className={styles.eachTransaction}>
                                    <div>
                                        <p> Origem : </p>
                                        <span> <> {transaction.origin}  </></span>
                                    </div>
                                    <div>
                                        <p> Valor : </p>
                                        <span> <> <Money value={transaction?.value}/>  </></span>
                                    </div>
                                    <div>
                                        <p> Data de Criação : </p>
                                        <span> <> {moment(transaction.created_at).format('DD-MM-yyyy HH:mm')} </> </span>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
                <div className={`${styles.rightInformation}`}>
                    <h3> Produto </h3>
                    <div className={styles.imageProduct}>
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL_IMAGES}/product/${rental?.product?.images[0].image}`} alt={rental?.product?.images[0]?.id} width={240} height={240} />
                        <div>
                            <div>
                                <p> Nome : </p>
                                <span> {rental?.product?.name}  </span>
                            </div>
                            <div>
                                <p> Categoria : </p>
                                <span> {rental?.product.category?.name}  </span>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    )


}