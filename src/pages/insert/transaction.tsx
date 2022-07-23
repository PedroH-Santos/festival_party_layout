import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormProducts from "../../components/Form/Insert/Dress";
import FormTransaction from "../../components/Form/Insert/Transaction";
import Header from "../../components/Header";
import Title from "../../components/Title";


export default function InsertTransaction() {

  const typeOptions =
    [
      {
        name: "Deposito",
        id: "deposit",
      },
      {
        name: "Saque",
        id: "withdraw",
      }
    ]


  const originOptions =
    [
      {
        name: "Aluguél de vestidos",
        id: "RENTAL_DRESS",
      },
      {
        name: "Aluguél de acessórios",
        id: "RENTAL_ACCESSORY",
      },
      {
        name: "Despesas",
        id: "RENTAL_SPENDING",
      },
      {
        name: "Receitas",
        id: "RENTAL_REVENUE",
      }
    ]

  return (
    <>
      <Header />
      <Body>
        <>
          <Title icon={faPlus} title="Cadastrar Transação" size="lg" />
          <FormTransaction originOptions={originOptions} typeOptions={typeOptions}/>
        </>
      </Body>
    </>
  )
}