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


  export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<User[]>([`users`], async () => await getUsers());
    await queryClient.prefetchQuery<Accessory[]>([`accessories`], async () => await getAccessories());
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients());
    await queryClient.prefetchQuery<Rental>(['rentalAccessory', { id }], async () => await getRentalAccessories({ id }));

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };
  }