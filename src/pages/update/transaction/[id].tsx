import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormUpdateTransaction from "../../../components/Form/Update/Transaction";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getTransaction, useTransaction } from "../../../services/hooks/Request/useTransaction";
import {  parseCookies } from "nookies";

interface IParams {
    id: string;
}


export default function UpdateTransaction({ id }: IParams) {

    const { data: transaction, error } = useTransaction({ id });


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
                    <Title icon={faPlus} title="Atualizar Transação" size="lg" />
                    <FormUpdateTransaction originOptions={originOptions} typeOptions={typeOptions} transaction={transaction}  />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'festivalParty.token' : token } = parseCookies(ctx);

  if(!token){
      return {
          redirect: {
              destination: "/",
              permanent: false,
          }
      }
  }   
  const { id } = ctx.params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Transaction>(['transaction', { id }], async () => await getTransaction({ id,ctx }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}