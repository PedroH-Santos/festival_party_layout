import { faShirt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import InformationDress from "../../../components/Details/Dress";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { api } from "../../../services/api";
import { useDress,getDress } from "../../../services/hooks/Request/useDress";
import { getRentals, useRentals } from "../../../services/hooks/Request/useRentals";

interface IParams {
    id: string;
}


export default function DetailDress( { id  }: IParams ) {
 
     const { data: dress, error } = useDress({ id });
     const { data: rentals,error: errorRentals  } = useRentals({dress_id: id});
    
    

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestido da cor listada" size="lg" />
                    <InformationDress dress={dress} rentals={rentals}/>
                </>
            </Body>
        </>
    ) 
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Dress>(['dress',{id}],async () => await getDress({ id }));
    await queryClient.prefetchQuery<Rental[]>(['rentalsDressId',{dress_id: id}],async () => await getRentals({ dress_id: id }));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
}