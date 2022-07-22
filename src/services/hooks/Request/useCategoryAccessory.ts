import { useQuery } from "react-query";
import { api } from "../../api";





export async function getCategorysAccessory(): Promise<AccessoryCategory[]> {

    const response = await api.get<AccessoryCategory[]>(`/accessory/category`).then(response => response.data);
    return response;
}



export function useCategoryAccessory() {
    return useQuery([`categorysAccessory`], async () => await getCategorysAccessory(),{
        staleTime: 1000 * 10 * 60,
    });


}