import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormClient from "../../components/Form/Insert/Client";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertClient() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Usuário" size="lg" />
                    <FormClient />
                </>
            </Body>
      </>
    )
  }