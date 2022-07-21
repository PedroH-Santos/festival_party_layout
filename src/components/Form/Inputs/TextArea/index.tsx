import React from "react";
import styles from "./styles.module.scss";
interface InputProps {
    name: string;
}

export default function TextArea({ name }: InputProps) {

    return (
        <>
            <label className={ styles.labelOrange}> {name} </label>
            <textarea className={ styles.textArea} ></textarea>
        </>
    )
}