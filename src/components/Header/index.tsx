import styles from "./styles.module.scss";
import Image from 'next/image'
import Link from "next/link";
import Menu from "./Menu";


export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link href="/list/today">
                    <Image src="/images/logo.png" className={`${styles.logo}`} alt="Logo" width={64} height={64} />
                </Link>

                <Menu />

            </div>
        </>
    )
}