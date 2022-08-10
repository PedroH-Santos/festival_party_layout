import ItemMenu from "./ItemMenu";
import ItemSubMenu from "./ItemSubMenu";
import styles from "./styles.module.scss";


export default function Menu() {
    return (
        <div className={styles.menu}>
            <nav className={styles.links}>
                <ItemMenu name="Aluguéis" haveSubMenu={true}>
                    <ItemSubMenu name="Todos" href="/list/rentals" />
                    <ItemSubMenu name="Aluguéis do dia" href="/list/today" />
                    <ItemSubMenu name="Recebimentos" href="/list/deliveries" />

                </ItemMenu>
                <ItemMenu name="Produtos" haveSubMenu={true}>
                    <ItemSubMenu name="Listagem" href="/list/products" />
                    <ItemSubMenu name="Categorias" href="/list/products/categories" />
                </ItemMenu>
                <ItemMenu name="Finanças" href="/list/transactions" haveSubMenu={false} />
                <ItemMenu name="Usuários" href="/list/users/1" haveSubMenu={false} />
                <ItemMenu name="Clientes" href="/list/clients" haveSubMenu={false} />

            </nav>
        </div>
    );

}