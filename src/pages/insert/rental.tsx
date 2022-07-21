import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormProducts from "../../components/Form/Insert/Dress";
import FormRental from "../../components/Form/Insert/Rental";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertRental() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Aluguél" size="lg" />
                    <FormRental />
                </>
            </Body>
      </>
    )
  }