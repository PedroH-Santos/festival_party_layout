import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Box from "./Box";
import styles from "./styles.module.scss";
interface PaginationProps {
    pagination: Pagination | undefined,
    search: string;
}


export default function Pagination({ pagination,search }: PaginationProps) {


    if (!pagination) {
        return <></>;
    }
    if(parseInt(pagination.totalCount) <= 0 ){
        return <></>;
    }
    const rows = [];
    const firstPage = 1;
    const currentPage = parseInt(pagination.page);
    const totalPages = parseInt(pagination.totalPages);
    const lastPage = totalPages;
    const totalData = parseInt(pagination.totalCount);

    if (firstPage != lastPage && firstPage != currentPage) {
        //PRIMEIRO
        rows.push(<Box page={`${firstPage}`} currentPage={currentPage} search={search} />)

    }
    if (currentPage - 1 > firstPage) {

        rows.push(<span className={`${styles.more}`}> ... </span>)
        rows.push(<Box page={`${currentPage - 1}`} currentPage={currentPage} search={search}/>)
    }

    rows.push(<Box page={`${currentPage}`} currentPage={currentPage} search={search}/>)

    if (currentPage + 1 < lastPage) {
        rows.push(<Box page={`${currentPage + 1}`} currentPage={currentPage} search={search}/>)
        rows.push(<span className={`${styles.more}`}> ... </span>)
    }

    if (firstPage != lastPage && lastPage != currentPage) {
        //ÚLTIMO
        rows.push(<Box page={`${lastPage}`} currentPage={currentPage} search={search}/>)
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
