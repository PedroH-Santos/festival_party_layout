import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useModal from "../../../../services/hooks/useModal";
import ModalDelete from "../../../Modal/Delete";
import styles from "./styles.module.scss";
import Image from "next/image";
import moment from "moment";
import ModalChangeStatus from "../../../Modal/ChangeStatus";
import { Money } from "../../../Trait/Money";

interface ListRentalsProps {
    rentals: Rental[] | undefined;
}


export default function ListRentalsToday({ rentals }: ListRentalsProps) {
    const { showModal, onChangeStatusModal } = useModal();
    const { showModal: showModalChange, onChangeStatusModal: onChangeStatusElementModal } = useModal();

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

                                    <td> <Image src={`http://localhost:3333/images/product/${firstImage}`} alt={firstId} width={60} height={60} /></td>
                                    <td> {rental.client.name} </td>
                                    <td><> <Money value={rental?.value}/> </> </td>
                                    <td><>{moment(rental.start_date).format('DD-MM-yyyy HH:mm')}</> </td>
                                    <td><>{moment(rental.expected_delivery_date).format('DD-MM-yyyy HH:mm')}</> </td>
                                    <td>

                                        <Link href={`/update/rental/${rental.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>

                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${rental?.description}`} elementId={`${rental?.id}`} route={`/rental`} resetList={`rentalsToday`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                        <Link href={`/detail/rental/${rental.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>

                                    </td>
                                    <td>
                                        <a className={`${styles.buttonMark}`} onClick={onChangeStatusElementModal}> Agendado </a>
                                        <ModalChangeStatus status="PROGRESS" elementName={`${rental?.description}`} elementId={`${rental?.id}`} route={`/rental/changeStatus`} resetList={`rentalsToday`} setIsOpen={onChangeStatusElementModal} isOpen={showModalChange} />

                                    </td>
                                </tr>

                            )
                        })}


                    </tbody>


                </table>
            </div>


        </>
    )
} 