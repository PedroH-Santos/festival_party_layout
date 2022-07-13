import Link from "next/link";
import ItemMenu from "./ItemMenu";


export default function Menu() {
    return (
        <nav>
            <ItemMenu name="Aluguéis" haveSubMenu={true}>


            </ItemMenu>
            <ItemMenu name="Vestidos" href="/list/rentals" haveSubMenu={true}/>
            <ItemMenu name="Acessórios" href="/list/dresses" haveSubMenu={true}/>
            <ItemMenu name="Finanças" href="/list/accessories" haveSubMenu={true}/>
            <ItemMenu name="Finanças" href="/list/transactions" haveSubMenu={true}/>
            <ItemMenu name="Usuários" href="/list/users" haveSubMenu={true}/>
            <ItemMenu name="Entregas" href="/list/deliveries" haveSubMenu={true}/>

        </nav>
    );

}