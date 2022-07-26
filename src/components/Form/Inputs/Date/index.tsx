import React, { ChangeEvent, useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
import moment from 'moment';

interface DateInputProps {
    name: string;
    text: string;
    register?: any;
    currentValue?: Date;
}

export default function DateInput({ name, text, register,currentValue }: DateInputProps) {
    const validation = (register) ? { ...register(name) } : '';
    return (
        <>  
            <label className={styles.labelOrange}> {text} </label>
            <input type={'datetime-local'}   value={moment(currentValue).format('yyyy-MM-DDThh:mm')} className={styles.input} {...validation}  />
        </>
    )
}