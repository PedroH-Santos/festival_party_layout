

import styles from "./styles.module.scss";

interface FormRequestSuccessProps {
    message: string | undefined;
}

export default function FormRequestSuccess({message}: FormRequestSuccessProps){


    return (
        <div className={`${styles.success}`}> <p>{message}</p></div>
    )
}