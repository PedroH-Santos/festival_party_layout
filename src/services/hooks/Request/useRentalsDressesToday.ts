import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsDressesToday(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/dress/today`).then(response => response.data);
    return response;
}



export function useRentalsDressesToday() {
    return useQuery([`rentalsDressesToday`], async () => await getRentalsDressesToday(),{
        staleTime: 1000 * 10 * 60,
    });


}