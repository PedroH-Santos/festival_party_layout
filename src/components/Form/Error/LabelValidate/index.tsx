

import styles from "./styles.module.scss";

interface LabelValidateProps {
    message: string | undefined;
}

export default function LabelValidate({message}: LabelValidateProps){


    return (
        <p className={`${styles.label}`}> {message}</p>
    )
}