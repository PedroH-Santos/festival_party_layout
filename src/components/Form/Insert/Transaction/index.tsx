import Input from "../../Inputs/Text";
import TextArea from "../../Inputs/TextArea";
import styles from "./styles.module.scss";

export default function FormTransaction() {
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
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <TextArea name="Email" />
                        </div>
                    </div>

                    <button className={`${styles.insertNew}`}>Cadastrar</button>
                </form>
            </div>
        </>
    )
} 