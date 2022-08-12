import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Filters } from "../../../services/hooks/useFilter";
import styles from "./styles.module.scss";

interface SearchProps {
    filter: Filters;
    changeValueFilter: Function;

}

export default function TextFilter({ filter,  changeValueFilter }: SearchProps) {
    return (
        <div className={ `${styles.container}`}>
            <label htmlFor="search"> <FontAwesomeIcon icon={faMagnifyingGlass} /></label>
            <input type="text" name="search" id="search" value={filter.value} className={`${styles.inputSearch}`} onChange={(e) => changeValueFilter(filter.name,e.target.value)} />
        </div>
    );
}