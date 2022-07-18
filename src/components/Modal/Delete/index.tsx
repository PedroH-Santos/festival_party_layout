

import { MouseEventHandler } from "react";
import styles from "./styles.module.scss";


interface ModalDeleteProps {
    nameDelete: string;
    isOpen: boolean;
    setIsOpen: MouseEventHandler<HTMLAnchorElement>;
}

export default function ModalDelete({ isOpen,setIsOpen, nameDelete }: ModalDeleteProps) {
    
    return (
        <>
            {isOpen && (
                <div className={`${styles.modal}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.containerText}`}>
                            <p className={`${styles.title}`}>  VOCÊ DESEJA EXCLUIR O ITEM:  </p>
                            <p className={`${styles.title}`}>   {nameDelete}</p>
                            <p className={`${styles.alert}`}>  (Essa ação é permanente e não reversível) </p>
                        </div>
                        <div className={`${styles.containerButtons}`}>
                            <a className={` ${styles.yes}`}> Sim </a>
                            <a className={` ${styles.no}`} onClick={setIsOpen}> Não </a>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}