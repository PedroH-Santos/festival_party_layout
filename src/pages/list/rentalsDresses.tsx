import { faCalendar, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListRentals from "../../components/List/Rentals";
import Title from "../../components/Title";
import { getRentalsDresses, useRentalsDresses } from "../../services/hooks/Request/useRentalsDresses";
import {  parseCookies } from "nookies";

export default function RentalsDresses() {
    const { data: rentals,error  } = useRentalsDresses();

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Alúgueis de Vestidos" size="lg" />
                    <ListRentals rentals={rentals} origin={'dress'} resetList={`rentalsDresses`}/>
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
    await queryClient.prefetchQuery<Rental[]>([`rentalsDresses`], async () => await getRentalsDresses(ctx));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
