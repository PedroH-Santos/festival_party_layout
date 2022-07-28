
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListDeliveries from "../../components/List/Deliveries";
import Title from "../../components/Title";
import { getRentalsAccessoriesFinishToday, useRentalsAccessoriesFinishToday } from "../../services/hooks/Request/useRentalsAccessoriesFinishToday";
import { getRentalsAccessoriesToday } from "../../services/hooks/Request/useRentalsAccessoriesToday";
import { getRentalsDressesFinishToday, useRentalsFinishDressesToday } from "../../services/hooks/Request/useRentalsDressesFinishToday";
import {  parseCookies } from "nookies";



export default function Deliveries() {
    const { data: rentalsDresses,error  } = useRentalsFinishDressesToday();
    const { data: rentalsAccessories  } = useRentalsAccessoriesFinishToday();

    return (
        <div className="content">
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Entregas de vestidos do dia" size="lg" />
                    <ListDeliveries rentals={rentalsDresses} origin="dress" resetList="rentalsDressesFinishToday" />

                    <Title icon={faCalendar} title="Entregas de acessórios do dia" size="lg" />
                    <ListDeliveries rentals={rentalsAccessories} origin="accessory" resetList="rentalsAccessoriesFinishToday" />
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
    await queryClient.prefetchQuery<Rental[]>([`rentalsDressesFinishToday`], async () => await getRentalsDressesFinishToday(ctx));
    await queryClient.prefetchQuery<Rental[]>([`rentalsAccessoriesFinishToday`], async () => await getRentalsAccessoriesFinishToday(ctx));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }