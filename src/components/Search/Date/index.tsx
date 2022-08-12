import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Filters } from "../../../services/hooks/useFilter";
import styles from "./styles.module.scss";

interface SearchProps {
    filter: Filters;
    changeValueFilter: Function;

}

export default function DateFilter({ filter,  changeValueFilter }: SearchProps) {
    return (
        <div className={ `${styles.container}`}>
            <input type={'datetime-local'} name="search" id="search" value={moment(filter.value).format('yyyy-MM-DDTHH:mm:ss.SSS')} className={`${styles.inputSearch}`} onChange={(e) => changeValueFilter(filter.name,e.target.value)} />
        </div>
    );
}