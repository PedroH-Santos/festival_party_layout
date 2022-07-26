import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../../../components/Body";
import FormCategory from "../../../../components/Form/Insert/Category";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";


export default function InsertCategory() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Categoria de acessórios" size="lg" />
                    <FormCategory origin="accessory" /> 
                </>
            </Body>
      </>
    )
  }