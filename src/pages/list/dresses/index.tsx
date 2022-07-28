import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListDresses from "../../../components/List/Dresses";
import Title from "../../../components/Title";
import { getDresses, useDresses } from "../../../services/hooks/Request/useDresses";
import {  parseCookies } from "nookies";

export default function Dresses() {

    const { data: dresses,error  } = useDresses();

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestidos" size="lg" />
                    <ListDresses dresses={dresses}/>
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
    await queryClient.prefetchQuery<CategoryDress[]>([`dresses`], async () => await getDresses(ctx));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
