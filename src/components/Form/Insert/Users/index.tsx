import Input from "../../Inputs/Text";
import styles from "./styles.module.scss";

export default function FormUser() {
    return (
        <>
            <div className={`${styles.container}`}>
                <form>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Input name="Nome" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Email" type="email" style="orange" />
                        </div>
                        <div>
                            <Input name="Senha" type="password" style="orange" />
                        </div>
                    </div>

                    <button className={`${styles.insertNew}`}>Cadastrar</button>
                </form>
            </div>
        </>
    )
} 