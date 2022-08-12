import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListTransactions from "../../../components/List/Transactions";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import { getTransactions, ITransactionPagination, useTransactions } from "../../../services/hooks/Request/Paginations/useTransactions";
import { useEffect, useState } from "react";
import { useFilter } from "../../../services/hooks/useFilter";


interface IParams {
    page: number;
}

interface TransactionsProps {
    page: number;
    search: string;
}





export default function Transactions({ page, search} :TransactionsProps) {
    const { filters, insertNewFilter, changeValueFilter, getUrlSearch } = useFilter();
  const { data: response,error  } = useTransactions({ page, urlSearch: getUrlSearch()});  

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
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finanças" size="lg" />
                    <ListTransactions transactions={response?.transactions} pagination={response?.pagination} filters={filters} changeValueFilter={changeValueFilter} />
                </>
            </Body>
      </>
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
    await queryClient.prefetchQuery<ITransactionPagination>([`transactions`,{urlSearch,page}], async () => await getTransactions({ctx,urlSearch,page}));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            urlSearch,
        }
    };
  }