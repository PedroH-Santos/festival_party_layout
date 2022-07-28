import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getRentalsDresses(ctx?:any): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/dress`).then(response => response.data);
    return response;
}



export function useRentalsDresses() {
    return useQuery([`rentalsDresses`], async () => await getRentalsDresses(),{
        staleTime: 1000 * 10 * 60,
    });


}