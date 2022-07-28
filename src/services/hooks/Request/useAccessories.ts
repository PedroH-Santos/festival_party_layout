import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getAccessories(ctx?:any): Promise<Accessory[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Accessory[]>(`/accessory`).then(response => response.data);
    return response;
}



export function useAccessories() {
    return useQuery([`accessories`], async () => await getAccessories(),{
        staleTime: 1000 * 10 * 60,
    });


}