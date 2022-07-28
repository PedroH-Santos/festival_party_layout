import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import InformationAccessory from "../../../components/Details/Accessory";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getAccessory, useAccessory } from "../../../services/hooks/Request/useAccessory";
import { getRentalsByIdAccessory, useRentalsByIdAccessory } from "../../../services/hooks/Request/useRentalsByIdAccessory";
import {  parseCookies } from "nookies";

interface IParams {
    id: string;
}


export default function DetailAccessory( { id  }: IParams ) {
 
     const { data: accessory, error } = useAccessory({ id });
     const { data: rentals,error: errorRentals  } = useRentalsByIdAccessory({accessory_id: id});
    
    

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestido da cor listada" size="lg" />
                    <InformationAccessory accessory={accessory} rentals={rentals}/>
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
    await queryClient.prefetchQuery<Accessory>(['accessory',{id}],async () => await getAccessory({ id,ctx }));
    await queryClient.prefetchQuery<Rental[]>(['rentalsByIdAccessory',{accessory_id: id}],async () => await getRentalsByIdAccessory({ accessory_id: id,ctx}));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
}