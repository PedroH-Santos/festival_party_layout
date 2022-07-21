import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormProducts from "../../components/Form/Insert/Dress";
import FormTransaction from "../../components/Form/Insert/Transaction";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertTransaction() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Transação" size="lg" />
                    <FormTransaction />
                </>
            </Body>
      </>
    )
  }