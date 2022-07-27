import React, { ChangeEvent, useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
import moment from 'moment';

interface DateInputProps {
    name: string;
    text: string;
    register?: any;
}

export default function DateInput({ name, text, register }: DateInputProps) {
    const validation = (register) ? { ...register(name) } : '';
    return (
        <>  
            <label className={styles.labelOrange}> {text} </label>
            <input type={'datetime-local'}   className={styles.input} {...validation}  />
        </>
    )
}