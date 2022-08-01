
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListDeliveries from "../../components/List/Deliveries";
import Title from "../../components/Title";
import { getRentalsFinishToday, useRentalsFinishToday } from "../../services/hooks/Request/useRentalsFinishToday";
import {  parseCookies } from "nookies";



export default function Deliveries() {
    const { data: rentals,error  } = useRentalsFinishToday();

    return (
        <div className="content">
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Entregas de produtos do dia" size="lg" />
                    <ListDeliveries rentals={rentals} />

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
    await queryClient.prefetchQuery<Rental[]>([`rentalsFinishToday`], async () => await getRentalsFinishToday(ctx));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }