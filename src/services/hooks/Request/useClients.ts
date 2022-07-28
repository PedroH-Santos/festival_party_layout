import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getClients(ctx?:any): Promise<Client[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Client[]>(`/client`).then(response => response.data);
    return response;
}



export function useClients() {
    return useQuery([`clients`], async () => await getClients(),{
        staleTime: 1000 * 10 * 60,
    });


}