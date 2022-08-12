import React, { ReactElement } from "react";
import styles from "./styles.module.scss";
import Select, { OptionsOrGroups, StylesConfig } from "react-select";
import { Controller } from "react-hook-form";


interface SelectProps {
    name: string;
    text: string;
    options: Option[] | undefined;
    register?: any;
    control: any;
    currentValue?: string;
}




export default function SelectTrait({ name, text, options, register, control, currentValue }: SelectProps) {

    const colourStyles: StylesConfig = {
        singleValue: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#FE6E6E',

        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: '#FE6E6E',
            color: '#fff',
        }),
        control: (provided) => ({
            ...provided,
            width: 400,
            backgroundColor: '#FE6E6E',
            color: '#fff',
        }),
    };

    let optionsTrait: OptionsTrait[] = [];
    options?.map(option => {
        const trait: OptionsTrait = {
            value: option.id,
            label: option.name
        }
        optionsTrait?.push(trait);
    })
    return (
        <>
            <label className={styles.labelOrange} > {text} </label>
            <Controller
                control={control}
                name={name}
                rules={register}
                render={({ field: { onChange } }) => (
                    <Select
                        id={name}
                        onChange={(val: any) => onChange(val.value)}
                        options={optionsTrait}
                        styles={colourStyles}
                        defaultValue={
                            optionsTrait.filter((option: OptionsTrait) => {
                                if(currentValue){
                                    return option.value === currentValue;
                                }
                                return null;
                            })
                        }
                    />
                )}
            />

        </>
    )
}