import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsDressesFinishToday(ctx?: any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/dress/finishToday`).then(response => response.data);
    return response;
}



export function useRentalsFinishDressesToday() {
    return useQuery([`rentalsDressesFinishToday`], async () => await getRentalsDressesFinishToday(),{
        staleTime: 1000 * 10 * 60,
    });


}