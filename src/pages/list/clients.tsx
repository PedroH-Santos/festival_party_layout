import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListClient from "../../components/List/Clients";
import ListDresses from "../../components/List/Dresses";
import Title from "../../components/Title";
import { getClients, useClients } from "../../services/hooks/Request/useClients";
import {  parseCookies } from "nookies";

export default function Clients() {

    const { data: clients,error  } = useClients();

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

    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }  
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients(ctx));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
