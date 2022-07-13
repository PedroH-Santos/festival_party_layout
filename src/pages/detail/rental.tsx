import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import InformationRental from "../../components/Details/Rental";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function DetailRental() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguél de Número 1 " size="lg" />
                    <InformationRental />
                </>
            </Body>
        </>
    )
}
