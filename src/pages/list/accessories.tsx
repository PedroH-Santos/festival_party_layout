import { faHatCowboy } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListAccessorys from "../../components/List/Accesorys";
import Title from "../../components/Title";
import { getAccessories, useAccessories } from "../../services/hooks/Request/useAccessories";

export default function Accessorys() {
    
  const { data: accessories,error  } = useAccessories();

  return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faHatCowboy} title="Accessórios" size="lg" />
                    <ListAccessorys accessories={accessories} />
                </>
            </Body>
      </>
    )
  }


    
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<CategoryDress[]>([`accessories`], async () => await getAccessories());

  return { 
      props: {
          dehydratedState: dehydrate(queryClient),
      }
  };
}
