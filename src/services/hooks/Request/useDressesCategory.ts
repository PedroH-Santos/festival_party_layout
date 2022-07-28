import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?: any;
} 

export async function getDressesCategory({ id,ctx } : IRequest): Promise<DressCategory> {
    const apiClient = getAPIClient(ctx);
    
    const response = await apiClient.get<DressCategory>(`/dress/category/detail/${id}`).then(response => response.data);
    return response;
}



export function useDressesCategory({ id }: IRequest) {
    return useQuery([`dressesCategory`,{id}], async () => await getDressesCategory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}