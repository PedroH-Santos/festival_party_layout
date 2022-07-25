import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import styles from "./styles.module.scss";
import Image from "next/image";

interface ListRentalsProps {
    rentals: Rental[] | undefined;
    origin: string;
}


export default function ListRentals({ rentals, origin }: ListRentalsProps) {
    const { showModal, onChangeStatusModal } = useModal();
    const pathImage = (origin == 'dress') ? '/dress' : '/accessory';
    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> </th>
                            <th> Cliente </th>
                            <th> Valor </th>
                            <th> Data de Início </th>
                            <th> Data de Término </th>
                            <th> Ações </th>
                            <th>  </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {rentals?.map((rental) => {
                            const firstImage = (rental.product?.images?.length > 0) ? rental.product?.images[0]?.image : '';
                            const firstId = (rental.product?.images?.length > 0) ? rental.product?.images[0]?.id : 'Sem Foto';
                            return (
                                <tr className={`${styles.item}`} key={rental?.id}>

                                    <td> <Image src={`http://localhost:3333/images/${pathImage}/${firstImage}`} alt={firstId} width={60} height={60} /></td>
                                    <td> {rental.client.name} </td>
                                    <td><>R$ {rental.value}</> </td>
                                    <td><>{rental.start_date}</> </td>
                                    <td><>{rental.expected_delivery_date}</> </td>
                                    <td>

                                        <Link href={`/update/rental/${rental.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>

                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${rental?.product?.name}`} elementId={`${rental?.id}`} route={`/rental/dress`} resetList={`rentalsDresses`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                        <Link href={`/detail/rental/${rental.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>

                                    </td>
                                    <td>
                                        <button className={`${styles.buttonMark}`}> Agendado </button>
                                    </td>
                                </tr>

                            )
                        })}


                    </tbody>


                </table>
            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/rental`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 