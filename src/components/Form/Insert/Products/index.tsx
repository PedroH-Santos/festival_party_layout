import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import Input from "../../Input";
import styles from "./styles.module.scss";


export default function FormProducts() {

    const [fileName, useFileName] = useState("");
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    function OpenChoosenFile() {
        hiddenFileInput?.current?.click();

    }

    function OnChooseImage(event: ChangeEvent) {
        const target = event.target as HTMLInputElement;
        let fileUploaded = '';

        if (target.files && target.files.length) {
            fileUploaded = target.files[0].name;
        }
        useFileName(fileUploaded);

    }

    return (
        <>
            <div className={`${styles.container}`}>
                <form>
                    <div className={`${styles.inputImage}`}>
                        <a onClick={OpenChoosenFile}>
                            <label> Imagem </label>
                            <FontAwesomeIcon icon={faPlus} />
                            <input type="file" className="hidden" onChange={OnChooseImage} ref={hiddenFileInput} />
                            <p> Atual: {fileName} </p>
                        </a>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Input name="Nome" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Valor" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="Categoria" type="text" style="orange" />
                        </div>
                    </div>

                    <button className={`${styles.insertNew}`}>Cadastrar</button>
                </form>
            </div>

        </>
    )
} 