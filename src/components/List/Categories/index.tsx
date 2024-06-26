import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import styles from "./styles.module.scss";


interface ListCategoriesProps {
    categories: ProductCategory[] |undefined;

}


export default function ListCategories({ categories }: ListCategoriesProps) {
    const { showModal, onChangeStatusModal } = useModal();

    return (
        <>
            <div className={`${styles.container}`}>
                <table>
                    <thead className={`${styles.header}`}>
                        <tr>
                            <th> Nome </th>
                            <th> Ações </th>

                        </tr>
                    </thead>
                    <tbody className={`${styles.body}`}>
                        {categories?.map((category) => {
                            return (
                                <tr className={`${styles.item}`} key={category.id}>
                                    <td>{category.name} </td>
                                    <td>

                                        <Link href={`/update/products/category/${category.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>
                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${category?.name}`} elementId={`${category?.id}`} route={`/product/category`} resetList={`productsCategories`} setIsOpen={onChangeStatusModal} isOpen={showModal} />

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>


                </table>
            </div>

            <div className={`${styles.button}`}>
                <Link href={`/insert/products/category`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 