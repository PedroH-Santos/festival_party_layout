import { faHatCowboy } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";
import Header from "../components/Header";
import ListAccessorys from "../components/List/Accesorys";
import Title from "../components/Title";

export default function Accessorys() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faHatCowboy} title="Accessórios" size="lg" />
                    <ListAccessorys />
                </>
            </Body>
      </>
    )
  }