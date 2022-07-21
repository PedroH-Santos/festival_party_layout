import React from "react";
import styles from "./styles.module.scss";
interface InputProps {
    name: string;
    type: string;
    text: string;
    style?: string;
}

export default function Input({name,type,style,text}: InputProps) {
    
    const styleLabel = style == 'orange'  ? styles.labelOrange : styles.labelWhite;
    return (
        <>
            <label className={styleLabel}> {text} </label>
            <input type={type} className={styles.input} name={name.toLowerCase()} />
        </>
    )
}