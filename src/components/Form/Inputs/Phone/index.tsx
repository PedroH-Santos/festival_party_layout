import React, { ChangeEvent, useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
import InputMask from 'react-input-mask';

interface TextProps {
    name: string;
    text: string;
    style?: string;
    register?: any;
    control?: any;
    defaultValue?: string;
}


export const getDefaultMask = (value: string | number | readonly string[] | undefined): string => {
    if (value === undefined || value == null) {
        value = '';
    }
    const currentMask = value.toString()
        .replace(/\D/g, '')
        .length > 10 ? `(99) 99999-9999` : `(99) 9999-9999`;
    return currentMask;
}


export default function Phone({ name, style, text, register, control,defaultValue }: TextProps) {
    const defaultMask = getDefaultMask(defaultValue);

    const styleLabel = style == 'orange' ? styles.labelOrange : styles.labelWhite;
    const validation = (register) ? { ...register(name) } : '';
    const [mask, setMask] = useState(defaultMask);


    function changeMask(event: any) {
        const target = (event.target as HTMLInputElement);
        const numberFound = event.code.match(/Numpad|Digit|Backspace/i);
        if (numberFound !== null) {
            const currentMask = target.value.replace(/\D/g, '').length == 10 ? `(99) 99999-9999` : `(99) 9999-9999`;
            if (currentMask !== mask) {
                setMask(currentMask);
            }
        }
    }


    return (
        <>
            <label className={styleLabel}> {text} </label>
            <Controller
                control={control}
                name={name}
                rules={register}
                render={({ field: { onChange, onBlur } }) => (
                    <InputMask mask={mask} type={'tel'}  className={styles.input} {...validation}
                    onKeyDown={changeMask}    

                    />
                )}

            />
        </>
    )
}