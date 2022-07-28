import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getClient({ id,ctx } : IRequest): Promise<Client> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Client>(`/client/detail/${id}`).then(response => response.data);
    return response;
}



export function useClient({ id }: IRequest) {
    return useQuery([`client`,{id}], async () => await getClient({id}),{
        staleTime: 1000 * 10 * 60,
    });


}