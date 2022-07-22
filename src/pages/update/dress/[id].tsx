import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import InformationDress from "../../../components/Details/Dress";
import FormUpdateDress from "../../../components/Form/Update/Dress";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { api } from "../../../services/api";
import { getCategorysDress, useCategoryDress } from "../../../services/hooks/Request/useCategoryDress";
import { useDress, getDress } from "../../../services/hooks/Request/useDress";
import { getRentals, useRentals } from "../../../services/hooks/Request/useRentals";

interface IParams {
    id: string;
}


export default function UpdateDress({ id }: IParams) {

    const { data: dress, error } = useDress({ id });
    const { data: categorys, error: errorCategory } = useCategoryDress();


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Vestidos" size="lg" />
                    <FormUpdateDress categorys={categorys} dress={dress} />
                </>
            </Body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Dress>(['dress', { id }], async () => await getDress({ id }));
    await queryClient.prefetchQuery<CategoryDress[]>([`categorysDress`], async () => await getCategorysDress());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}