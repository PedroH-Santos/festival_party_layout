import { faCalendar, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListRentals from "../../../components/List/Rentals";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import { useState } from "react";




interface IParams {
    page: number;
}


interface RentalsProps {
    page: number;
    start_date: string;
    expected_delivery_date: string;
}


export default function Rentals({expected_delivery_date,start_date,page}:RentalsProps) {
    const [startDate, setStartDate] = useState<string>(start_date);
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>(expected_delivery_date)

    const { data: response, error } = useRentals({page,start_date,expected_delivery_date});
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Alúgueis" size="lg" />
                    <ListRentals rentals={response?.rentals} pagination={response?.pagination} startDate={startDate} setStartDate={setStartDate} expectedDeliveryDate={expectedDeliveryDate} setExpectedDeliveryDate={setExpectedDeliveryDate}/>
                </>
            </Body>
        </>
    )
} 


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token' : token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const  start_date = (ctx.query.start_date) ? ctx.query.start_date as string : '';
    const  expected_delivery_date = (ctx.query.expected_delivery_date) ? ctx.query.expected_delivery_date as string : '';

    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }  
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Rental[]>([`rentals`,{page,start_date,expected_delivery_date}], async () => await getRentals({page,start_date,expected_delivery_date}));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            start_date,
            expected_delivery_date,
            page,
        }
    };
  }
