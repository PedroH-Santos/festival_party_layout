import Link from "next/link";
import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
interface ItemMenuProps {
    name: string;
    href?: string;


}


export default function ItemMenu({ href, name }: ItemMenuProps) {



    return (
        <nav>
            <Link href={`${href}`} >
                <a className={`${styles.link}`}>{name}</a>
            </Link>

        </nav>
    );

}