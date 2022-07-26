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


  export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<User[]>([`users`], async () => await getUsers());
    await queryClient.prefetchQuery<Accessory[]>([`accessories`], async () => await getAccessories());
    await queryClient.prefetchQuery<Client[]>([`clients`], async () => await getClients());

    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }