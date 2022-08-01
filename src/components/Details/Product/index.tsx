
import styles from "./styles.module.scss";
import Image from 'next/image'
import moment from "moment";


interface InformationProductProps {
    product: Product | undefined;
    rentals: Rental[] | undefined;
}

export default function InformationProduct({product,rentals} : InformationProductProps) {
     const rentalLimit = rentals?.slice(0,3);


    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.topInformation}`}>
                <Image src={`http://localhost:3333/images/product/${product?.images[0].image}`} alt={product?.images[0].id} className={styles.image} width={360} height={360} />
                <div>
                    <h2> Próximos Aluguéis </h2>
                    {rentalLimit?.map((rental) => {
                        const phrase = `${rental.start_date} - ${rental.user.name}`;
                        return (
                            <p key={rental.id}> {phrase} </p>
                        )
                    })}


                </div>
            </div>
            <div className={`${styles.footerInformation}`}>
                <div>
                    <p> Categoria : </p>
                    <span> {product?.category.name}  </span>
                </div>
                <div>
                    <p>  Preço : </p>
                    <span> R$ {product?.price}  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> <>{moment(product?.created_at).format('DD-MM-yyyy HH:mm')}</> </span>
                </div>
            </div>
        </div>
    )


}