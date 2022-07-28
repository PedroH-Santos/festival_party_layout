import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";





export async function getCategorysAccessory(ctx?:any): Promise<AccessoryCategory[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<AccessoryCategory[]>(`/accessory/category`).then(response => response.data);
    return response;
}



export function useCategoryAccessory() {
    return useQuery([`categorysAccessory`], async () => await getCategorysAccessory(),{
        staleTime: 1000 * 10 * 60,
    });


}