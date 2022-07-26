import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAccessoriesCategories, useAccessoriesCategories } from "../../../../services/hooks/Request/useAccessoriesCategories";
import Body from "../../../../components/Body";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import ListCategories from "../../../../components/List/Categories";
 
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




  
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<CategoryDress[]>([`accessoriesCategories`], async () => await getAccessoriesCategories());
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
