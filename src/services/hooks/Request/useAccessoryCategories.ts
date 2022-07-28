import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getAccessoriesCategory({ id,ctx } : IRequest): Promise<AccessoryCategory> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<AccessoryCategory>(`/accessory/category/detail/${id}`).then(response => response.data);
    return response;
}



export function useAccessoriesCategory({ id }: IRequest) {
    return useQuery([`accessoriesCategory`,{id}], async () => await getAccessoriesCategory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}