import { faShirt } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListDresses from "../../components/List/Dresses";
import Title from "../../components/Title";
 
export default function Dresses() {
    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestidos" size="lg" />
                    <ListDresses/>
                </>
            </Body>
        </div>
    )
} 