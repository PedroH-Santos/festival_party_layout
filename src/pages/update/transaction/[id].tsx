import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormUpdateTransaction from "../../../components/Form/Update/Transaction";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getTransaction, useTransaction } from "../../../services/hooks/Request/useTransaction";

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
                    <Title icon={faPlus} title="Atualizar Transação" size="lg" />
                    <FormUpdateTransaction originOptions={originOptions} typeOptions={typeOptions} transaction={transaction}  />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Transaction>(['transaction', { id }], async () => await getTransaction({ id }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}