import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsToday(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/today`).then(response => response.data);
    return response;
}



export function useRentalsToday() {
    return useQuery([`rentalsToday`], async () => await getRentalsToday(),{
        staleTime: 1000 * 10 * 60,
    });


}