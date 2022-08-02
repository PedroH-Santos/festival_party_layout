import React, { useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";
import InputMask from 'react-input-mask';
import NumberFormat from "react-number-format";

interface PriceProps {
    name: string;
    text: string;
    style?: string;
    register?: any;
    control?: any;
}

export default function Price({ name, style, text, register, control }: PriceProps) {
    const styleLabel = style == 'orange' ? styles.labelOrange : styles.labelWhite;

    return (
        <>
            <label className={styleLabel}> {text} </label>
            <div className={styles.inputGroup}>
                <span className={styles.prefix}> R$ </span>
                <Controller
                    control={control}
                    name={name}
                    rules={register}
                    render={({ field: { onChange } }) => (
                        <NumberFormat
                        id={name}
                            displayType={'input'}
                            thousandSeparator={`.`}
                            prefix={''}
                            decimalSeparator={`,`}
                            fixedDecimalScale={true}
                            decimalScale={2}
                            className={styles.input}
                            name={name}
                            onValueChange={(val: any) => { 
                               onChange(val.value);
                            }}
                        />
                    )}
                />

            </div>
        </>
    )
}