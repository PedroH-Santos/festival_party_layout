import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListClient from "../../../components/List/Clients";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import { getClients, useClients,IClientPagination } from "../../../services/hooks/Request/Paginations/useClients";
import { useState } from "react";

interface IParams {
    page: number;
}

interface ClientsProps {
    page: number;
    filter: string;
}


export default function Clients({page,filter}: ClientsProps) {
    const [search, setSearch] = useState<string>(filter)
    const { data: clients,error  } = useClients({page,search});

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Clientes" size="lg" />
                    <ListClient clients={clients}/>
                </>
            </Body>
        </div>
    )
} 




  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token' : token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;
    const  search = (ctx.query.search) ? ctx.query.search as string : '';

    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }  
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IClientPagination>([`clients`,{search,page}], async () => await getClients({page,search,ctx}));
  
    return {  
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
