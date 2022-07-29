import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import {  parseCookies } from "nookies";
import { getProductsCategories, useProductsCategories } from "../../../services/hooks/Request/useProductsCategories";
import FormProduct from "../../../components/Form/Insert/Product";


export default function InsertProduct() {
  const { data: categorys, error } = useProductsCategories();

  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Produto" size="lg" />
                    <FormProduct categorys={categorys} />
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
  await queryClient.prefetchQuery<ProductCategory[]>([`productsCategories`], async () => await getProductsCategories(ctx));

  return { 
      props: {
          dehydratedState: dehydrate(queryClient),
      }
  };
}