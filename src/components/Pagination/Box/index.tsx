import styles from "../styles.module.scss";
interface BoxProps {
    page: string,
    currentPage: number,
    search: string;

}


export default function Box({ page,currentPage,search }: BoxProps) {
    const isActive = (Number(page) == currentPage) ? styles.active : '';
    return (
        <>
            <a href={`${page}?search=${search}`} key={`${page}`} className={`${styles.box} ${isActive}`}>{`${page}`}</a>
        </>
    )
}