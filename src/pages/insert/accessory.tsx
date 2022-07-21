import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormProducts from "../../components/Form/Insert/Dress";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertAccessory() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Accessórios" size="lg" />
                    <FormProducts />
                </>
            </Body>
      </>
    )
  }