import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import FormAccessory from "../../components/Form/Insert/Accessory";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { getCategorysAccessory, useCategoryAccessory } from "../../services/hooks/Request/useCategoryAccessory";


export default function InsertAccessory() {
  const { data: categorys, error } = useCategoryAccessory();
  
  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Accessórios" size="lg" />
                    <FormAccessory categorys={categorys}/>
                </>
            </Body>
      </>
    )
  }


    
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<AccessoryCategory[]>([`categorysAccessory`], async () => await getCategorysAccessory());

  return { 
      props: {
          dehydratedState: dehydrate(queryClient),
      }
  };
}