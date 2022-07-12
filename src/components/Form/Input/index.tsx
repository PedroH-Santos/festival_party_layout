import React from "react";
import styles from "./styles.module.scss";
interface InputProps {
    name: string;
    type: string;
    style?: string;
}

export default function Input({name,type,style}: InputProps) {
    
    const styleLabel = style == 'orange'  ? styles.labelOrange : styles.labelWhite;
    return (
        <>
            <label className={styleLabel}> {name} </label>
            <input type={type} className={styles.input} />
        </>
    )
}