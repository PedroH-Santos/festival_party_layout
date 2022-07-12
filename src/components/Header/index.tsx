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
                        <Link href="/rentals"> Aluguéis </Link>
                        <Link href="/dresses"> Vestidos </Link>
                        <Link  href="/accessories"> Acessórios </Link>
                        <Link  href="/transactions"> Finanças </Link>
                        <Link  href="/users"> Usuários </Link>
                        <Link href="/deliveries"> Entregas </Link>


                    </nav>
                </div>
            </div>
        </>
    )
}