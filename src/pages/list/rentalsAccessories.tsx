import { faCalendar, faShirt } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListRentals from "../../components/List/Rentals";
import Title from "../../components/Title";

export default function RentalsAccessories() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguéis de Accessórios" size="lg" />
                    <ListRentals/>
                </>
            </Body>
        </>
    )
} 