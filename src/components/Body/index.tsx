import { ReactElement } from "react";
import styles from "./styles.module.scss";

interface BodyProps {
    children: ReactElement;
}

export default function Body({children}: BodyProps) {

    return (
        <div className={`${styles.background}`}>
            {children}
        </div>
    )
}