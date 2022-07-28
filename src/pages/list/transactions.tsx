import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListTransactions from "../../components/List/Transactions";
import Title from "../../components/Title";
import { getTransactions, useTransactions } from "../../services/hooks/Request/useTransactions";
import {  parseCookies } from "nookies";

export default function Transactions() {
  const { data: transactions,error  } = useTransactions();  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finanças" size="lg" />
                    <ListTransactions transactions={transactions} />
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
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Transaction[]>([`transactions`], async () => await getTransactions(ctx));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }