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
                    <ItemSubMenu name="Aluguéis do dia" href="/list/today" />
                    <ItemSubMenu name="Recebimentos" href="/list/deliveries" />

                </ItemMenu>
                <ItemMenu name="Vestidos" haveSubMenu={true}>
                    <ItemSubMenu name="Listagem" href="/list/dresses" />
                    <ItemSubMenu name="Categorias" href="/list/dresses/categories" />
                </ItemMenu>
                <ItemMenu name="Acessórios" haveSubMenu={true}>
                    <ItemSubMenu name="Listagem" href="/list/accessories" />
                    <ItemSubMenu name="Categorias" href="/list/accessories/categories" />
                </ItemMenu>
                <ItemMenu name="Finanças" href="/list/transactions" haveSubMenu={false} />
                <ItemMenu name="Usuários" href="/list/users" haveSubMenu={false} />
                <ItemMenu name="Clientes" href="/list/clients" haveSubMenu={false} />

            </nav>
        </div>
    );

}