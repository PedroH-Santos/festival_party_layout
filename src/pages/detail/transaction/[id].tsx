import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import InformationTransaction from "../../../components/Details/Transaction";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getTransaction, useTransaction } from "../../../services/hooks/Request/useTransaction";



interface IParams {
    id: string;
}

export default function DetailTransaction({id}: IParams) {
    const { data: transaction, error } = useTransaction({ id });

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finança Número 1" size="lg" />
                    <InformationTransaction transaction={transaction}/>
                </>
            </Body>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Transaction>(['transaction',{id}],async () => await getTransaction({ id }));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
}