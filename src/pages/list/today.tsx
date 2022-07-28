
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListRentals from "../../components/List/Rentals";
import ListRentalsToday from "../../components/List/Rentals/Today";
import Title from "../../components/Title";
import { getRentalsAccessoriesToday, useRentalsAccessoriesToday } from "../../services/hooks/Request/useRentalsAccessoriesToday";
import { getRentalsDressesToday, useRentalsDressesToday } from "../../services/hooks/Request/useRentalsDressesToday";
import {  parseCookies } from "nookies";



export default function Today() {
    const { data: rentalsDresses,error  } = useRentalsDressesToday();
    const { data: rentalsAccessories  } = useRentalsAccessoriesToday();

    
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguéis de vestidos do dia" size="lg" />
                    <ListRentalsToday rentals={rentalsDresses} origin={"dress"} resetList={"rentalsDressesToday"}  />

                    <Title icon={faCalendar} title="Aluguéis de acessórios do dia" size="lg" />
                    <ListRentalsToday rentals={rentalsAccessories} origin={"accessory"} resetList={"rentalsAccessoriesToday"}  />

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
    await queryClient.prefetchQuery<Rental[]>([`rentalsDressesToday`], async () => await getRentalsDressesToday(ctx));
    await queryClient.prefetchQuery<Rental[]>([`rentalsAccessoriesToday`], async () => await getRentalsAccessoriesToday(ctx));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
