import React from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
interface TextProps {
    name: string;
    text: string;
    style?: string;
    register?: any;
}

export default function Text({ name, style, text, register }: TextProps) {
    const styleLabel = style == 'orange' ? styles.labelOrange : styles.labelWhite;
   const validation = (register) ? { ...register(name) } : '';
    return (
        <>
            <label className={styleLabel}> {text} </label>
            <input type={'text'} className={styles.input} {...validation}/>
        </>
    )
}