import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../../components/Body";
import Header from "../../../../components/Header";
import Title from "../../../../components/Title";
import FormUpdateCategory from "../../../../components/Form/Update/Category";
import {  parseCookies } from "nookies";
import { getProductsCategory, useProductsCategory } from "../../../../services/hooks/Request/useProductsCategory";

interface IParams {
    id: string;
}


export default function UpdateCategory({ id }: IParams) {

    const { data: category, error } = useProductsCategory({ id });


    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Atualizar Transação" size="lg" />
                    <FormUpdateCategory category={category} />
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
    await queryClient.prefetchQuery<ProductCategory>(['productsCategory', { id }], async () => await getProductsCategory({ id,ctx }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}