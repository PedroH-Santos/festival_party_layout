import ItemMenu from "./ItemMenu";
import ItemSubMenu from "./ItemSubMenu";
import styles from "./styles.module.scss";

export default function Menu() {
    return (
        <div className={styles.menu}>
            <nav className={styles.links}>
                <ItemMenu name="Aluguéis" haveSubMenu={true}>
                    <ItemSubMenu name="Vestidos" href="/list/rentalsDresses" />
                    <ItemSubMenu name="Accessórios" href="/list/rentalsAccessories" />

                </ItemMenu>
                <ItemMenu name="Vestidos" href="/list/dresses" haveSubMenu={false} />
                <ItemMenu name="Acessórios" href="/list/accessories" haveSubMenu={false} />
                <ItemMenu name="Finanças" href="/list/transactions" haveSubMenu={false} />
                <ItemMenu name="Usuários" href="/list/users" haveSubMenu={false} />
                <ItemMenu name="Entregas" href="/list/deliveries" haveSubMenu={false} />

            </nav>
        </div>
    );

}