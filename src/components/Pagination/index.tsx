import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Filters } from "../../services/hooks/useFilter";
import Box from "./Box";
import styles from "./styles.module.scss";
interface PaginationProps {
    pagination: Pagination | undefined,
    filters: Filters[];
}


export default function Pagination({ pagination,filters }: PaginationProps) {


    if (!pagination) {
        return <></>;
    }
    if(parseInt(pagination.totalCount) <= 0 ){
        return <></>;
    }

    let urlSearch = '';
    filters.map((filter) => {
        urlSearch += `${filter.name}=${filter.value}&`;
    })

    const rows = [];
    const firstPage = 1;
    const currentPage = parseInt(pagination.page);
    const totalPages = parseInt(pagination.totalPages);
    const lastPage = totalPages;
    const totalData = parseInt(pagination.totalCount);

    if (firstPage != lastPage && firstPage != currentPage) {
        //PRIMEIRO
        rows.push(<Box page={`${firstPage}`} currentPage={currentPage} urlSearch={urlSearch} />)

    }
    if (currentPage - 1 > firstPage) {

        rows.push(<span className={`${styles.more}`}> ... </span>)
        rows.push(<Box page={`${currentPage - 1}`} currentPage={currentPage} urlSearch={urlSearch} />)
    }

    rows.push(<Box page={`${currentPage}`} currentPage={currentPage} urlSearch={urlSearch} />)

    if (currentPage + 1 < lastPage) {
        rows.push(<Box page={`${currentPage + 1}`} currentPage={currentPage} urlSearch={urlSearch} />)
        rows.push(<span className={`${styles.more}`}> ... </span>)
    }

    if (firstPage != lastPage && lastPage != currentPage) {
        //ÚLTIMO
        rows.push(<Box page={`${lastPage}`} currentPage={currentPage} urlSearch={urlSearch} />)
    }

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.containerTotal}`}>
                <> <strong>{totalData}</strong> Dados cadastrados </>
            </div>
            <div className={`${styles.containerBoxs}`}>
                {currentPage - 1 >= firstPage && (
                    <a href={`${currentPage - 1}`} className={`${styles.box}`}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </a>
                )}
                {
                    rows
                }
                {currentPage + 1 <= lastPage && (
                    <a href={`${currentPage + 1}`} className={`${styles.box}`}>
                        <FontAwesomeIcon icon={faAngleRight} />

                    </a>
                )}
            </div>
        </div>

    )
}
