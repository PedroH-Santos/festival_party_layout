import styles from "../styles.module.scss";
interface BoxProps {
    page: string,
    currentPage: number,

}


export default function Box({ page,currentPage }: BoxProps) {
    const isActive = (Number(page) == currentPage) ? styles.active : '';
    return (
        <>
            <a href={`${page}`} key={`${page}`} className={`${styles.box} ${isActive}`}>{`${page}`}</a>
        </>
    )
}