import styles from "./styles.module.scss";
import Image from 'next/image'
import Link from "next/link";


export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
                <div className={styles.menu}>

                </div>
            </div>
        </>
    )
}