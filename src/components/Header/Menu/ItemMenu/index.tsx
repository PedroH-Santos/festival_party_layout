import Link from "next/link";
import { ReactNode, useState } from "react";

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
        setShowSubMenu(true);
    }

    return (
        <nav>
            {haveSubMenu ? (
                <a onMouseEnter={onShowSubMenu} onMouseLeave={onHideSubMenu} > {name} </a>

            ) : (
                <Link href={`${href}`} > {name} </Link>
            )

            }
            {showSubMenu && (
                <>
                    {children}
                </>
            )}

        </nav>
    );

}