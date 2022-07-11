
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";
import Header from "../components/Header";
import ListRentals from "../components/List/Rentals";
import Title from "../components/Title";



export default function ListToday() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguéis de vestidos do dia" size="lg" />
                    <ListRentals />
                </>
            </Body>
        </>
    )
} 