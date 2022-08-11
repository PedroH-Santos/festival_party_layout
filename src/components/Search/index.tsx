import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

interface SearchProps {
    search: string;
    setSearch: Function;

}

export default function Search({ search, setSearch }: SearchProps) {
    return (
        <div className={ `${styles.container}`}>
            <label htmlFor="search"> <FontAwesomeIcon icon={faMagnifyingGlass} /></label>
            <input type="text" name="search" id="search" value={search} className={`${styles.inputSearch}`} onChange={(e) => setSearch(e.target.value)} />
        </div>
    );
}