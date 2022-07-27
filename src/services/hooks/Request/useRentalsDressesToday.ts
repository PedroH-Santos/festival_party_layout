import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsDressesToday(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/dress/today`).then(response => response.data);
    return response;
}



export function useRentalsDressesToday() {
    return useQuery([`rentalsDressesToday`], async () => await getRentalsDressesToday(),{
        staleTime: 1000 * 10 * 60,
    });


}