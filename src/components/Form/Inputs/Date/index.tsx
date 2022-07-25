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
const [a,setA] = useState('');
    const onChangeDate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(target.value).format('YYYY-MM-DD HH:MM:SS');
        setA(newDate);
              };
    return (
        <>
            <label className={styles.labelOrange}> {text} </label>
            <input type={'datetime-local'}   className={styles.input} {...validation} onChange={(e) => onChangeDate(e)} />
        </>
    )
}