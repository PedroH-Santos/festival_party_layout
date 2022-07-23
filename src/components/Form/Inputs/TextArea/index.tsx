import React from "react";
import styles from "./styles.module.scss";
interface InputProps {
    text: string;
    name: string;
    register?: any;
}

export default function TextArea({ text,name,register }: InputProps) {
    const validation = (register) ? 
    { ...register(name) } 
    : '';
    return (
        <>
            <label className={ styles.labelOrange}> {text} </label>
            <textarea className={ styles.textArea} {...validation}></textarea>
        </>
    )
}