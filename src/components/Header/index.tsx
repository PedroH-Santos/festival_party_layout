import styles from "./styles.module.scss";
import Image from 'next/image'


export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
                <div className={styles.menu}>
                    <nav>
                        <a href="#"> Aluguéis </a>
                        <a  href="#"> Vestidos </a>
                        <a  href="#"> Acessórios </a>
                        <a  href="#"> Finanças </a>
                        <a  href="#"> Usuários </a>
                        <a  href="#"> Entregas </a>


                    </nav>
                </div>
            </div>
        </>
    )
}