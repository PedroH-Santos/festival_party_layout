import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getDressesCategory, useDressesCategory } from "../../../../services/hooks/Request/useDressesCategory";
import Body from "../../../../components/Body";
import FormUpdateUser from "../../../../components/Form/Update/Users";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import FormUpdateCategory from "../../../../components/Form/Update/Category";

interface IParams {
    id: string;
}


export default function UpdateCategory({ id }: IParams) {

    const { data: category, error } = useDressesCategory({ id });


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Atualizar Transação" size="lg" />
                    <FormUpdateCategory category={category} origin="dress" />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<DressCategory>(['dressesCategory', { id }], async () => await getDressesCategory({ id }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}