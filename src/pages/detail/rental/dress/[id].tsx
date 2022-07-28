import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../../components/Body";
import InformationRental from "../../../../components/Details/Rental";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import { getRental, useRental } from "../../../../services/hooks/Request/useRental";
import {  parseCookies } from "nookies";




interface IParams {
    id: string;
}

export default function DetailRental({id}: IParams) {
    const { data: rental, error } = useRental({ id });

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finança Número 1" size="lg" />
                    <InformationRental rental={rental} origin="dress"/>
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
    const { id } = ctx.params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Rental>(['rental',{id}],async () => await getRental({ id,ctx }));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
}