import { useQuery } from "react-query";
import { api } from "../../api";




export async function getClients(): Promise<Client[]> {

    const response = await api.get<Client[]>(`/client`).then(response => response.data);
    return response;
}



export function useClients() {
    return useQuery([`clients`], async () => await getClients(),{
        staleTime: 1000 * 10 * 60,
    });


}