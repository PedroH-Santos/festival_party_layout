import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsAccessories(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/accessory`).then(response => response.data);
    return response;
}



export function useRentalsAccessories() {
    return useQuery([`rentalsAccessories`], async () => await getRentalsAccessories(),{
        staleTime: 1000 * 10 * 60,
    });


}