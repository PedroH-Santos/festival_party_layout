import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormUpdateClient from "../../../components/Form/Update/Client";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getClient, useClient } from "../../../services/hooks/Request/useClient";
import {  parseCookies } from "nookies";

interface IParams {
    id: string;
}


export default function UpdateClient({ id }: IParams) {

    const { data: client, error } = useClient({ id });

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Atualizar Cliente" size="lg" />
                    <FormUpdateClient client={client}  />
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
    await queryClient.prefetchQuery<Client>(['client', { id }], async () => await getClient({ id,ctx }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}