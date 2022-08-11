import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useModal from "../../../services/hooks/useModal";
import ModalDelete from "../../Modal/Delete";
import Pagination from "../../Pagination";
import Search from "../../Search";
import { Money } from "../../Trait/Money";
import styles from "./styles.module.scss";

interface ListProductsProps {
    products: Product[] | undefined;
    pagination: Pagination | undefined;
    search: string;
    setSearch: Function;
}


export default function ListProducts({ products,pagination,search,setSearch }: ListProductsProps) {

    const { showModal, onChangeStatusModal } = useModal();

    console.log(products);

    return (
        <>
            <div className={`${styles.container}`}>
            <div className={`${styles.containerSearch}`}>
                    <Search search={search} setSearch={setSearch}/>
                </div>
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
                        {products?.map((product) => {
                            const firstImage = (product.images.length > 0) ? product.images[0].image : '';
                            const firstId = (product.images.length > 0) ? product.images[0].id : 'Sem Foto';
                            return (

                                <tr className={`${styles.item}`} key={product.id}>
                                    <td> <Image src={`${process.env.NEXT_PUBLIC_API_URL_IMAGES}/product/${firstImage}`} alt={firstId} width={60} height={60} /></td>
                                    <td>{product.name} </td>
                                    <td><Money value={product?.price}/> </td>
                                    <td>{product.category.name} </td>
                                    <td>
                                        
                                        <Link href={`/update/products/${product.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={`${styles.icon}`} />
                                        </Link>
                                        
                                        <FontAwesomeIcon icon={faTrashCan} className={`${styles.icon}`} onClick={onChangeStatusModal} />
                                        <ModalDelete elementName={`${product?.name}`} elementId={`${product?.id}`} route={`/product`} resetList={`products`}setIsOpen={onChangeStatusModal} isOpen={showModal} />
                                        
                                        <Link href={`/detail/products/${product.id}`}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.icon}`} />
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>


                </table>
                <Pagination pagination={pagination} search={search} />

            </div>
            <div className={`${styles.button}`}>
                <Link href={`/insert/products`} >
                    <a className={`${styles.insertNew}`}>Cadastrar</a>
                </Link>
            </div>

        </>
    )
} 