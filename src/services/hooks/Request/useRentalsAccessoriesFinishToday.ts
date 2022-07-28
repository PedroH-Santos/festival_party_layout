import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsAccessoriesFinishToday(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/accessory/finishToday`).then(response => response.data);
    return response;
}



export function useRentalsAccessoriesFinishToday() {
    return useQuery([`rentalsAccessoriesFinishToday`], async () => await getRentalsAccessoriesFinishToday(),{
        staleTime: 1000 * 10 * 60,
    });


}