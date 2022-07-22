import { useQuery } from "react-query";
import { api } from "../../api";




export async function getAccessories(): Promise<Accessory[]> {

    const response = await api.get<Accessory[]>(`/accessory`).then(response => response.data);
    return response;
}



export function useAccessories() {
    return useQuery([`accessories`], async () => await getAccessories(),{
        staleTime: 1000 * 10 * 60,
    });


}