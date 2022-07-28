import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";

import ListUsers from "../../components/List/Users";
import Title from "../../components/Title";
import { useUsers,getUsers } from "../../services/hooks/Request/useUsers";
import {  parseCookies } from "nookies";

export default function Users() {
  const {data:users, error} = useUsers();  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faUser} title="Usuários" size="lg" />
                    <ListUsers users={users} />
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
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }