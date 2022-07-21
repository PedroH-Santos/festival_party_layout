
import styles from "./styles.module.scss";
import Image from 'next/image'


interface InformationDressProps {
    dress: Dress | undefined;
    rentals: Rental[] | undefined;
}

export default function InformationDress({dress,rentals} : InformationDressProps) {
     const rentalLimit = rentals?.slice(0,3);


    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.topInformation}`}>
                <Image src={`http://localhost:3333/images/${dress?.images[0].image}`} alt={dress?.images[0].id} className={styles.image} width={360} height={360} />
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
                    <span> {dress?.category.name}  </span>
                </div>
                <div>
                    <p>  Preço : </p>
                    <span> R$ {dress?.price}  </span>
                </div>
                <div>
                    <p> Criação : </p>
                    <span> <> {dress?.created_at} </> </span>
                </div>
            </div>
        </div>
    )


}