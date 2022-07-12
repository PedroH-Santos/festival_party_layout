import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormProducts from "../../components/Form/Insert/Products";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertDress() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Vestidos" size="lg" />
                    <FormProducts />
                </>
            </Body>
      </>
    )
  }