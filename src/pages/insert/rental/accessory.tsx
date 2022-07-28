import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormProducts from "../../../components/Form/Insert/Dress";
import FormRental from "../../../components/Form/Insert/RentalAccessory";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getAccessories, useAccessories } from "../../../services/hooks/Request/useAccessories";
import { getClients, useClients } from "../../../services/hooks/Request/useClients";
import { getUsers, useUsers } from "../../../services/hooks/Request/useUsers";
import {  parseCookies } from "nookies";


export default function InsertRental() {
  const { data: users, error } = useUsers();
  const { data: accessories  } = useAccessories();
  const { data: clients } = useClients();


    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Aluguél" size="lg" />
                    <FormRental products={accessories} users={users} clients={clients} origin="accessory"/>
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
    await queryClient.prefetchQuery<Accessory[]>([`accessories`], async () => await getAccessories(ctx));
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients(ctx));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }