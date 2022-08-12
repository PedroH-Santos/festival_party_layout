import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Filters } from "../../services/hooks/useFilter";
import DateFilter from "./Date";
import styles from "./styles.module.scss";
import TextFilter from "./Text";

interface SearchProps {
    filters: Filters[];
    changeValueFilter: Function;

}

export default function Search({ filters, changeValueFilter }: SearchProps) {
    return (
        <>
            {filters.map((filter) => {
                if (filter.type == 'text') {
                    return (<div className={`${styles.container}`}>
                        <TextFilter changeValueFilter={changeValueFilter} filter={filter} /> </div>)
                } else if (filter.type == 'date') {
                    return (<div className={`${styles.container}`}><DateFilter changeValueFilter={changeValueFilter} filter={filter} />    </div>)
                }
            })}

        </>
    );
}