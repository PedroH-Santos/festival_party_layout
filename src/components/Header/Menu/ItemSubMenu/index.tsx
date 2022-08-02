import Link from "next/link";
import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface ItemMenuProps {
    name: string;
    href?: string;


}


export default function ItemMenu({ href, name }: ItemMenuProps) {
    const router = useRouter();

    let isActive = '';
    if(router.route === href){
        isActive = styles.active;
    }

    return (
        <nav>
            <Link href={`${href}`} >
                <a className={`${styles.link} ${isActive}`}>{name}</a>
            </Link>

        </nav>
    );

}