import { faPlus, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
import { useProduct, getProduct } from "../../../services/hooks/Request/useProduct";
import {  parseCookies } from "nookies";
import { getProductsCategories, useProductsCategories } from "../../../services/hooks/Request/useProductsCategories";
import FormUpdateProduct from "../../../components/Form/Update/Product";

interface IParams {
    id: string;
}


export default function UpdateProduct({ id }: IParams) {

    const { data: product, error } = useProduct({ id });
    const { data: categorys, error: errorCategory } = useProductsCategories();

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title={ `Atualizar Produto - ${product?.name}`} size="lg" />
                    <FormUpdateProduct categorys={categorys} product={product} />
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
    await queryClient.prefetchQuery<Product>(['product', { id }], async () => await getProduct({ id,ctx }));
    await queryClient.prefetchQuery<ProductCategory[]>([`productsCategories`], async () => await getProductsCategories(ctx));

    return {
        props: { 
            dehydratedState: dehydrate(queryClient),
            id
        }
    };;
}