import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

interface TitleProps {
    icon: IconDefinition;
    title: string;
    size: SizeProp;

}

export default function Title({icon,title,size}: TitleProps) {
    return (
        <div className={`${styles.container}`}>
            <FontAwesomeIcon icon={icon}  size={`${size}`}/>
            <h1> {title} </h1>
        </div>
    );
}