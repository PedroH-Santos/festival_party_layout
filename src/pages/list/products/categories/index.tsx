import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getProductsCategories, useProductsCategories } from "../../../../services/hooks/Request/useProductsCategories";
import Body from "../../../../components/Body";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import ListCategories from "../../../../components/List/Categories";
import {  parseCookies } from "nookies";

export default function ProductsCategories() {

    const { data: categories,error  } = useProductsCategories();

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Categorias de Produtos" size="lg" />
                    <ListCategories categories={categories} />
                </>
            </Body>
        </div>
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
