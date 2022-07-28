import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAccessoriesCategories, useAccessoriesCategories } from "../../../../services/hooks/Request/useAccessoriesCategories";
import Body from "../../../../components/Body";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import ListCategories from "../../../../components/List/Categories";
import {  parseCookies } from "nookies";

export default function AccessoriesCategories() {

    const { data: categories,error  } = useAccessoriesCategories();

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Categorias de Acessórios" size="lg" />
                    <ListCategories categories={categories} origin="accessory" resetList="accessoriesCategories"/>
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
    await queryClient.prefetchQuery<CategoryDress[]>([`accessoriesCategories`], async () => await getAccessoriesCategories(ctx));
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
