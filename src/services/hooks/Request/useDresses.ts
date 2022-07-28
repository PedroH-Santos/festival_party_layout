import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getDresses(ctx?:any): Promise<Dress[]> {

    const apiClient = getAPIClient(ctx);
    const response = await apiClient.get<Dress[]>(`/dress`).then(response => response.data);
    return response;
}



export function useDresses() {
    return useQuery([`dresses`], async () => await getDresses(),{
        staleTime: 1000 * 10 * 60,
    });


}