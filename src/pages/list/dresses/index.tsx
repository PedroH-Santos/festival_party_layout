import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListDresses from "../../../components/List/Dresses";
import Title from "../../../components/Title";
import { getDresses, useDresses } from "../../../services/hooks/Request/useDresses";
 
export default function Dresses() {

    const { data: dresses,error  } = useDresses();

    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestidos" size="lg" />
                    <ListDresses dresses={dresses}/>
                </>
            </Body>
        </div>
    )
} 




  
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<CategoryDress[]>([`dresses`], async () => await getDresses());
  
    return { 
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    };
  }
