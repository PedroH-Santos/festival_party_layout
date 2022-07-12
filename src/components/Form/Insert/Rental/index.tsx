import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import Input from "../../Input";
import TextArea from "../../TextArea";
import styles from "./styles.module.scss";


export default function FormRental() {



    return (
        <>
            <div className={`${styles.container}`}>
                <form>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Input name="Usuário" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Tipo" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Produto" type="text" style="orange" />
                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Input name="Valor" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Data de Entrega" type="date" style="orange" />
                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <TextArea name="Descrição"/>

                    </div>
                    <button className={`${styles.insertNew}`}>Cadastrar</button>
                </form>
            </div>

        </>
    )
} 