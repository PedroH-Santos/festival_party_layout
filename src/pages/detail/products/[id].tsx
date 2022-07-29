import { faShirt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { api } from "../../../services/api";
import { useProduct,getProduct } from "../../../services/hooks/Request/useProduct";
import {  parseCookies } from "nookies";
import { getRentalsByProductId, useRentalsByProductId } from "../../../services/hooks/Request/useRentalsByProductId";
import InformationProduct from "../../../components/Details/Product";

interface IParams {
    id: string;
}


export default function DetailProduct( { id  }: IParams ) {
 
     const { data: product, error } = useProduct({ id });
     const { data: rentals,error: errorRentals  } = useRentalsByProductId({product_id: id});
    
    

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title={ `${product?.name}`} size="lg" />
                    <InformationProduct product={product} rentals={rentals}/>
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
    await queryClient.prefetchQuery<Product>(['product',{id}],async () => await getProduct({ id,ctx }));
    await queryClient.prefetchQuery<Rental[]>(['rentalsProductId',{product_id: id}],async () => await getRentalsByProductId({ product_id: id,ctx }));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
}