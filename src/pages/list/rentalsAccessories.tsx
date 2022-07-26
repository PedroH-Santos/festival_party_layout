import { faCalendar, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListRentals from "../../components/List/Rentals";
import Title from "../../components/Title";
import { getRentalsAccessories, useRentalsAccessories } from "../../services/hooks/Request/useRentalsAccessories";

export default function RentalsAccessories() {
    const { data: rentals,error  } = useRentalsAccessories();
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Aluguéis de Accessórios" size="lg" />
                    <ListRentals rentals={rentals} origin={'accessory'} resetList={`rentalsAccessories`} />
                </>
            </Body>
        </>
    )
} 


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Rental[]>([`rentalsAccessories`], async () => await getRentalsAccessories());
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
