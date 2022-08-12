import styles from "../styles.module.scss";
interface BoxProps {
    page: string,
    currentPage: number,
    urlSearch: string;

}


export default function Box({ page,currentPage,urlSearch }: BoxProps) {
    const isActive = (Number(page) == currentPage) ? styles.active : '';

    
    return (
        <>
            <a href={`${page}?${urlSearch}`} key={`${page}`} className={`${styles.box} ${isActive}`}>{`${page}`}</a>
        </>
    )
}