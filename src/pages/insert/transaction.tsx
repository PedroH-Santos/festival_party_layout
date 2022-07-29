import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormTransaction from "../../components/Form/Insert/Transaction";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

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
        name: "Primeira parcela do aluguél",
        id: "PRIMEIRA_PARCELA",
      },
      {
        name: "Segunda parcela do aluguél",
        id: "SEGUNDA_PARCELA",
      },
      {
        name: "Despesas",
        id: "DESPESAS",
      },
      {
        name: "Receitas",
        id: "RECEITAS",
      }
    ]

  return (
    <>
      <Header />
      <Body>
        <>
          <Title icon={faPlus} title="Cadastrar Transação" size="lg" />
          <FormTransaction originOptions={originOptions} typeOptions={typeOptions} />
        </>
      </Body>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'festivalParty.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  return {
    props: {
    }
  };

}