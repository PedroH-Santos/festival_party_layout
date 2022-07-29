import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getProduct({ id,ctx } : IRequest): Promise<Product> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Product>(`/product/detail/${id}`).then(response => response.data);
    return response;
}



export function useProduct({ id }: IRequest) {
    return useQuery([`product`,{id}], async () => await getProduct({id}),{
        staleTime: 1000 * 10 * 60,
    });


}