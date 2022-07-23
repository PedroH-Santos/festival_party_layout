import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import FormUpdateAccessory from "../../../components/Form/Update/Accessory";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getAccessory, useAccessory } from "../../../services/hooks/Request/useAccessory";
import { getCategorysAccessory, useCategoryAccessory } from "../../../services/hooks/Request/useCategoryAccessory";


interface IParams {
    id: string;
}


export default function UpdateDress({ id }: IParams) {

    const { data: accessory, error } = useAccessory({ id });
    const { data: categorys, error: errorCategory } = useCategoryAccessory();


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Accessório" size="lg" />
                    <FormUpdateAccessory categorys={categorys} accessory={accessory} />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Accessory>(['accessory', { id }], async () => await getAccessory({ id }));
    await queryClient.prefetchQuery<CategoryDress[]>([`categorysAccessory`], async () => await getCategorysAccessory());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}