
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListRentalsToday from "../../components/List/Rentals/Today";
import Title from "../../components/Title";
import {  parseCookies } from "nookies";
import { getRentalsToday, useRentalsToday } from "../../services/hooks/Request/useRentalsToday";



export default function Today() {
    const { data: rentals,error,isLoading  } = useRentalsToday();


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguéis do dia" size="lg" />
                    <ListRentalsToday rentals={rentals}   />

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
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Rental[]>([`rentalsToday`], async () => await getRentalsToday(ctx));
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
