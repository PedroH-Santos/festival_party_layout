import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
interface ItemMenuProps {
    name: string;
    haveSubMenu: boolean;
    href?: string;
    children?: ReactNode;

}


export default function ItemMenu({ href, name, haveSubMenu, children }: ItemMenuProps) {
    const router = useRouter();

    const [showSubMenu, setShowSubMenu] = useState(false);
    let isActive = '';
    if(router.route === href){
        isActive = styles.active;
    }
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
                    <a className={`${styles.link} ${isActive}`}>{name} </a>
                    {showSubMenu && (
                        <div className={`${styles.submenu}`}>
                            {children}
                        </div>
                    )}
                </div>

            ) : (
                <Link href={`${href}`}>
                    <a className={`${styles.link} ${isActive}`}> {name} </a>
                </Link>
            )

            }


        </nav>
    );

}