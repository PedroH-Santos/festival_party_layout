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
import { useDress, getDress } from "../../../services/hooks/Request/useDress";
import { getDressesCategories, useDressesCategories } from "../../../services/hooks/Request/useDressesCategories";
import { getRentals, useRentals } from "../../../services/hooks/Request/useRentals";
import {  parseCookies } from "nookies";

interface IParams {
    id: string;
}


export default function UpdateDress({ id }: IParams) {

    const { data: dress, error } = useDress({ id });
    const { data: categorys, error: errorCategory } = useDressesCategories();


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
    const { id } = ctx.params as unknown as IParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Dress>(['dress', { id }], async () => await getDress({ id,ctx }));
    await queryClient.prefetchQuery<CategoryDress[]>([`dressesCategories`], async () => await getDressesCategories(ctx));

    return {
        props: { 
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}