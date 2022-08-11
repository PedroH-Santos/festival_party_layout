import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListTransactions from "../../../components/List/Transactions";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import { getTransactions, ITransactionPagination, useTransactions } from "../../../services/hooks/Request/Paginations/useTransactions";
import { useState } from "react";


interface IParams {
    page: number;
}

interface TransactionsProps {
    page: number;
    filter: string;
}





export default function Transactions({ page, filter} :TransactionsProps) {
    const [search, setSearch] = useState<string>(filter)
  const { data: response,error  } = useTransactions({ page, search});  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finanças" size="lg" />
                    <ListTransactions transactions={response?.transactions} pagination={response?.pagination} search={search} setSearch={setSearch} />
                </>
            </Body>
      </>
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
    await queryClient.prefetchQuery<ITransactionPagination>([`transactions`,{search,page}], async () => await getTransactions({ctx,search,page}));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            filter: search,
        }
    };
  }