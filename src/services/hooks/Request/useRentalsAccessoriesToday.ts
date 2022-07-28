import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsAccessoriesToday(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/accessory/today`).then(response => response.data);
    return response;
}



export function useRentalsAccessoriesToday() {
    return useQuery([`rentalsAccessoriesToday`], async () => await getRentalsAccessoriesToday(),{
        staleTime: 1000 * 10 * 60,
    });


}