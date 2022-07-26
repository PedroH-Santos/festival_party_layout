import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../../../components/Body";
import FormCategory from "../../../../components/Form/Insert/Category";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";


export default function InsertUser() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Categoria de vestidos" size="lg" />
                    <FormCategory origin="dress" />
                </>
            </Body>
      </>
    )
  }