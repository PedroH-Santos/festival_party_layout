import React, { ReactElement } from "react";
import styles from "./styles.module.scss";
import Select, { OptionsOrGroups, StylesConfig } from "react-select";

interface Option {
    id: string;
    name: string;
}


interface SelectProps {
    name: string;
    text: string;
    options: Option[];
}

export default function SelectTrait({ name, text, options }: SelectProps) {

    const colourStyles: StylesConfig = {
        singleValue:(provided) => ({
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

    let optionsTrait: any = [];
    options.map(option => {
        const trait = {
            value: option.id,
            label: option.name
        }
        optionsTrait?.push(trait);
    })
    return (
        <>
            <label className={styles.labelOrange} > {text} </label>
            <Select options={optionsTrait} name={name} styles={colourStyles} />
        </>
    )
}