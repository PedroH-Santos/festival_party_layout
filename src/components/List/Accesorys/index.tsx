import Link from "next/link";
import styles from "./styles.module.scss";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDelete from "../../Modal/Delete";
import useModal from "../../../services/hooks/useModal";
import Image from "next/image";

interface ListAccessorysProps {
    accessories: Accessory[] | undefined;
}

export default function ListAccessorys({ accessories }: ListAccessorysProps) {
    const { showModal, onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> </th>
                            <th> Nome </th>
                            <th> Valor </th>
                            <th> Categoria </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {accessories?.map((accessory) => {
                            
                            const firstImage = (accessory.images.length > 0) ? accessory.images[0].image : '';
                            const firstId = (accessory.images.length > 0) ? accessory.images[0].id : 'Sem Foto';
                            return (

                                <tr className={`${styles.item}`} key={accessory.id}>
                                    <td> <Image src={`http://localhost:3333/images/accessory/${firstImage}`} alt={firstId} width={60} height={60} /></td>
                                    <td>{accessory.name} </td>
                                    <td>R$ {accessory.price} </td>
                                    <td>{accessory.category.name} </td>
                                    <td>

                                        <Link href={`/update/accessory/${accessory.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>

                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${accessory?.name}`} elementId={`${accessory?.id}`} route={`/accessory`} resetList={`accessories`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                        <Link href={`/detail/accessory/${accessory.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>



                </table>
            </div>
            <div className={`${styles.button}`}>

                <Link href={`/insert/accessory`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 