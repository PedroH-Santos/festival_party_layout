import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../../components/Body";

import FormUpdateRental from "../../../../components/Form/Update/RentalAccessory";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import { getAccessories, useAccessories } from "../../../../services/hooks/Request/useAccessories";
import { getClients, useClients } from "../../../../services/hooks/Request/useClients";
import { getRentalAccessories, useRentalAccessories } from "../../../../services/hooks/Request/useRentalAccessories";
import { getUsers, useUsers } from "../../../../services/hooks/Request/useUsers";
import {  parseCookies } from "nookies";


interface IParams {
  id: string;
}

export default function UpdateRental({ id }: IParams) {
  const { data: users, error } = useUsers();
  const { data: accessories  } = useAccessories();
  const { data: clients } = useClients();
  const { data: rental } = useRentalAccessories({id});
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title={`Atualizar aluguél: ${rental?.id}`} size="lg" />
                    <FormUpdateRental products={accessories} users={users} clients={clients} origin="accessory" rental={rental}/>
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
    await queryClient.prefetchQuery<Accessory[]>([`accessories`], async () => await getAccessories(ctx));
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients(ctx));
    await queryClient.prefetchQuery<Rental>(['rentalAccessory', { id }], async () => await getRentalAccessories({ id,ctx }));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
  }