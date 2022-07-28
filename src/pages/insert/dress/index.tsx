import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormDress from "../../../components/Form/Insert/Dress";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getDressesCategories, useDressesCategories } from "../../../services/hooks/Request/useDressesCategories";
import {  parseCookies } from "nookies";


export default function InsertDress() {
  const { data: categorys, error } = useDressesCategories();

  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Vestidos" size="lg" />
                    <FormDress categorys={categorys} />
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
  await queryClient.prefetchQuery<CategoryDress[]>([`dressesCategories`], async () => await getDressesCategories(ctx));

  return { 
      props: {
          dehydratedState: dehydrate(queryClient),
      }
  };
}