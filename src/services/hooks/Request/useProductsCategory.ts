import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getProductsCategory({ id,ctx } : IRequest): Promise<ProductCategory> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<ProductCategory>(`/product/category/detail/${id}`).then(response => response.data);
    return response;
}



export function useProductsCategory({ id }: IRequest) {
    return useQuery([`productsCategory`,{id}], async () => await getProductsCategory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}