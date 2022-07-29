import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {  parseCookies } from "nookies";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getProducts, useProducts } from "../../../services/hooks/Request/useProducts";
import { getUsers, useUsers } from "../../../services/hooks/Request/useUsers";
import { getClients, useClients } from "../../../services/hooks/Request/useClients";
import { getRental, useRental } from "../../../services/hooks/Request/useRental";
import FormUpdateRental from "../../../components/Form/Update/Rental";


interface IParams {
  id: string;
}

export default function UpdateRental({ id }: IParams) {
  const { data: users, error } = useUsers();
  const { data: products  } = useProducts();
  const { data: clients } = useClients();
  const { data: rental } = useRental({id});

    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title={`Atualizar aluguél: ${rental?.id}`} size="lg" />
                    <FormUpdateRental products={products} users={users} clients={clients}  rental={rental}/>
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
    await queryClient.prefetchQuery<User[]>([`users`], async () => await getUsers(ctx));
    await queryClient.prefetchQuery<Product[]>([`products`], async () => await getProducts(ctx));
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients(ctx));
    await queryClient.prefetchQuery<Rental>(['rental', { id }], async () => await getRental({ id,ctx }));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
  }