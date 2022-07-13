import { faShirt } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import InformationDress from "../../components/Details/Dress";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function DetailDress() {
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestido da cor listada" size="lg" />
                    <InformationDress />
                </>
            </Body>
        </>
    )
}
