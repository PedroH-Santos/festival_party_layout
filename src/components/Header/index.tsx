import styles from "./styles.module.scss";
import Image from 'next/image'
import Link from "next/link";


export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
                <div className={styles.menu}>
                    <nav>
                        <Link href="/list/rentals"> Aluguéis </Link>
                        <Link href="/list/dresses"> Vestidos </Link>
                        <Link  href="/list/accessories"> Acessórios </Link>
                        <Link  href="/list/transactions"> Finanças </Link>
                        <Link  href="/list/users"> Usuários </Link>
                        <Link href="/list/deliveries"> Entregas </Link>


                    </nav>
                </div>
            </div>
        </>
    )
}