import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?: any;
} 

export async function getAccessory({ id,ctx } : IRequest): Promise<Accessory> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Accessory>(`/accessory/detail/${id}`).then(response => response.data);
    return response;
}



export function useAccessory({ id }: IRequest) {
    return useQuery([`accessory`,{id}], async () => await getAccessory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}