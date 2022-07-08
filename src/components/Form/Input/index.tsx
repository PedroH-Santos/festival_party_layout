import React from "react";
import styles from "./styles.module.scss";
interface InputProps {
    name: string;
    type: string;
}

export default function Input({name,type}: InputProps) {
    return (
        <>
            <label className={styles.label}> {name} </label>
            <input type={type} className={styles.input} />
        </>
    )
}