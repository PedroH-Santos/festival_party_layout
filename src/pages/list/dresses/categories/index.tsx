import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getDressesCategories, useDressesCategories } from "../../../../services/hooks/Request/useDressesCategories";
import Body from "../../../../components/Body";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import ListCategories from "../../../../components/List/Categories";
 
export default function DressesCategories() {

    const { data: categories,error  } = useDressesCategories();

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Categorias de Vestidos" size="lg" />
                    <ListCategories categories={categories} origin="dress" resetList="dressesCategories"/>
                </>
            </Body>
        </div>
    )
} 




  
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<CategoryDress[]>([`dressesCategories`], async () => await getDressesCategories());
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
