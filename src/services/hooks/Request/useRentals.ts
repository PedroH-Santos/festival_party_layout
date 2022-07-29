import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";





export async function getRentals(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental`).then(response => response.data);

    return response;
}



export function useRentals() {
    return useQuery([`rentals`], async () => await getRentals(),{
        staleTime: 1000 * 10 * 60,
    });


}