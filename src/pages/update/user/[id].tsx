import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import FormUpdateUser from "../../../components/Form/Update/Users";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { getUser, useUser } from "../../../services/hooks/Request/useUser";

interface IParams {
    id: string;
}


export default function UpdateUser({ id }: IParams) {

    const { data: user, error } = useUser({ id });


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Atualizar Transação" size="lg" />
                    <FormUpdateUser user={user}  />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<User>(['user', { id }], async () => await getUser({ id }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}