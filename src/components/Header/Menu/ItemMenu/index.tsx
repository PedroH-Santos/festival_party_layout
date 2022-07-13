import Link from "next/link";
import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
interface ItemMenuProps {
    name: string;
    haveSubMenu: boolean;
    href?: string;
    children?: ReactNode;

}


export default function ItemMenu({ href, name, haveSubMenu, children }: ItemMenuProps) {

    const [showSubMenu, setShowSubMenu] = useState(false);

    function onShowSubMenu() {
        setShowSubMenu(true);
    }

    function onHideSubMenu() {
     setShowSubMenu(false);
    }

    return (
        <nav>
            {haveSubMenu ? (
                <div onMouseEnter={onShowSubMenu} onMouseLeave={onHideSubMenu}  className={`${styles.container}`}  >
                    <a className={`${styles.link}`}>{name} </a>
                    {showSubMenu && (
                        <div className={`${styles.submenu}`}>
                            {children}
                        </div>
                    )}
                </div>

            ) : (
                <Link href={`${href}`}>
                    <a className={`${styles.link}`}> {name} </a>
                </Link>
            )

            }


        </nav>
    );

}