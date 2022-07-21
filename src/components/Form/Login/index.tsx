import React from "react";
import styles from "./styles.module.scss"; 
import Image from 'next/image'
import Input from "../Inputs/Text";

export default function Login() {
    return (
        <>
            <div className={`${styles.background}`}>
                <div>
                    <div className={styles.logo}>
                        <Image src="/images/logo.png" alt="Logo" width={128} height={128} />
                    </div>
                    <form className={`${styles.form}`}>
                        <div>
                            <Input name="Email" type="email" />
                        </div>
                        <div>
                            <Input name="Senha" type="password" />
                        </div>
                        <div>
                           <button type="submit"> Logar</button>
                        </div>
                    </form>
                </div>
 
            </div>
        </>
    )
}