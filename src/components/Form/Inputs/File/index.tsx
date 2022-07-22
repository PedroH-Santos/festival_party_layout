import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useRef, useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
interface FileProps {
    name: string;
    text: string;
    register?: any;
    currentValue?: string;
}

export default function File({ name, text, register,currentValue }: FileProps) {
    const [file, useFile] = useState<File | null>();
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const { ref } = register('image');

    const validation = (register) ?
        {...register(name, {
            onChange: (e: React.ChangeEvent<Element>) => OnChooseImage(e),
        })}
        : '';

    function OpenChoosenFile() {
        hiddenFileInput?.current?.click();


    }

    function OnChooseImage(event: ChangeEvent) {
        const target = event.target as HTMLInputElement;
        let fileUploaded = null;
        if (target.files && target.files.length) {
            fileUploaded = target.files[0];
        }
        useFile(fileUploaded);


    }
    return (
        <>
            <a onClick={OpenChoosenFile} className={`${styles.input}`} >
                <label> {text} </label>
                <FontAwesomeIcon icon={faPlus} />
                <input type="file" className="hidden"  {...validation} 
                    ref={(e) => { 
                        ref(e);
                        hiddenFileInput.current = e
                    }}
                />
                <p> Atual: {(file?.name) ? file?.name : currentValue}  </p>
            </a>

        </>
    )
}