import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {  parseCookies } from "nookies";
import Body from "../../components/Body";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { getClients, useClients } from "../../services/hooks/Request/useClients";
import { getUsers, useUsers } from "../../services/hooks/Request/useUsers";
import { getProducts, useProducts } from "../../services/hooks/Request/useProducts";
import FormRental from "../../components/Form/Insert/Rental";


export default function InsertRental() {
  const { data: users, error } = useUsers();
  const { data: products  } = useProducts();
  const { data: clients } = useClients();


    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Aluguél" size="lg" />
                    <FormRental products={products} users={users} clients={clients} />
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
    await queryClient.prefetchQuery<User[]>([`users`], async () => await getUsers(ctx));
    await queryClient.prefetchQuery<Product[]>([`products`], async () => await getProducts(ctx));
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients(ctx));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }