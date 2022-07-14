import { faTriangleExclamation, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./styles.module.scss";
import ReactTooltip from 'react-tooltip';

interface ToolTipProps {
    icon: IconDefinition,
    text: string
}


export default function ToolTip({icon,text}: ToolTipProps) {



    return (
        <div
            className={styles.containerAlertLate}
>
            <p data-tip={'Atrasado'}>
                <FontAwesomeIcon icon={icon} />
            </p>
            <ReactTooltip
                className={styles.alertLate}
                />
        </div>
    )
}