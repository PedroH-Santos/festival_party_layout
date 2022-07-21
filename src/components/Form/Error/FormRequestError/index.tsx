

import styles from "./styles.module.scss";

interface FormRequestErrorProps {
    message: string | undefined;
}

export default function FormRequestError({message}: FormRequestErrorProps){


    return (
        <div className={`${styles.error}`}> <p>{message}</p></div>
    )
}