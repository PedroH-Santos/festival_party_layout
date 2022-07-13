import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import InformationTransaction from "../../components/Details/Transaction";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function DetailTransaction() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finança Número 1" size="lg" />
                    <InformationTransaction />
                </>
            </Body>
        </>
    )
}
