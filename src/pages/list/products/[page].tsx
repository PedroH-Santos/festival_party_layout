import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import ListProducts from "../../../components/List/Products";
import { useEffect, useState } from "react";
import { getProducts, IProductsPagination, useProducts } from "../../../services/hooks/Request/Paginations/useProducts";
import { useFilter } from "../../../services/hooks/useFilter";


interface IParams {
    page: number;
}

interface ProductsProps {
    page: number;
    search: string;
}


export default function Products({ page,search }: ProductsProps) {

    const { filters, insertNewFilter, changeValueFilter, getUrlSearch } = useFilter();


    const { data: response, error } = useProducts({ page,urlSearch: getUrlSearch() });


    useEffect(() => {
        const filters = [
            {
                name: "search",
                value: (search) ? search : '',
                type: "text",
            },
        ]
        insertNewFilter(filters);
    }, [])
    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Produtos" size="lg" />
                    <ListProducts products={response?.products} pagination={response?.pagination} filters={filters} changeValueFilter={changeValueFilter}/>
                </>
            </Body>
        </div>
    )
} 




  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token' : token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const  search = (ctx.query.search) ? ctx.query.search as string : '';
    const urlSearch = `search=${search}`;

    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }  
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IProductsPagination>([`products`,{ page, urlSearch}], async () => await getProducts({ page, urlSearch, ctx}));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            search,
        }
    };
  }
