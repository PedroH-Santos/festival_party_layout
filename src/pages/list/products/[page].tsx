import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import ListProducts from "../../../components/List/Products";
import { useState } from "react";
import { getProducts, IProductsPagination, useProducts } from "../../../services/hooks/Request/Paginations/useProducts";


interface IParams {
    page: number;
}

interface ProductsProps {
    page: number;
    filter: string;
}


export default function Products({ page,filter }: ProductsProps) {

    const [search, setSearch] = useState<string>(filter)
    const { data: response, error } = useProducts({ page,search });
    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Produtos" size="lg" />
                    <ListProducts products={response?.products} pagination={response?.pagination} search={search} setSearch={setSearch}/>
                </>
            </Body>
        </div>
    )
} 




  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token' : token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const  search = (ctx.query.search) ? ctx.query.search as string : '';


    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }  
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IProductsPagination>([`products`,{ page, search}], async () => await getProducts({ page, search, ctx}));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            filter: search
        }
    };
  }
