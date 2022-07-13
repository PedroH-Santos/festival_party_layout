import { faHatCowboy } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import InformationAccessory from "../../components/Details/Accessory";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function DetailAccessory() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faHatCowboy} title="Accessório da cor listada" size="lg" />
                    <InformationAccessory />
                </>
            </Body>
        </>
    )
}
