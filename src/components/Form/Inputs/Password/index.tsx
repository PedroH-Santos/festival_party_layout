import React from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
interface NumberProps {
    name: string;
    text: string;
    style?: string;
    register?: any;
}

export default function Password({ name, style, text, register }: NumberProps) {
    const styleLabel = style == 'orange' ? styles.labelOrange : styles.labelWhite;
    const validation = (register) ? 
    { ...register(name) } 
    : '';
    return (
        <>

            <label className={styleLabel}> {text} </label>
            <input type={'password'} className={styles.input}  {...validation}/>

        </>
    )
}