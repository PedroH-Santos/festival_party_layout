import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsFinishToday(ctx?: any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/finishToday`).then(response => response.data);
    return response;
}



export function useRentalsFinishToday() {
    return useQuery([`rentalsFinishToday`], async () => await getRentalsFinishToday(),{
        staleTime: 1000 * 10 * 60,
    });


}