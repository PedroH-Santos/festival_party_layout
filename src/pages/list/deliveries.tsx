
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListDeliveries from "../../components/List/Deliveries";
import Title from "../../components/Title";



export default function Deliveries() {
    return (
        <div className="content">
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Entregas de vestidos do dia" size="lg" />
                    <ListDeliveries />

                    <Title icon={faCalendar} title="Entregas de acessórios do dia" size="lg" />
                    <ListDeliveries />
                </>
            </Body>
        </div>
    )
} 