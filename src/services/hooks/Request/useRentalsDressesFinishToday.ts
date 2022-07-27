import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsDressesFinishToday(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/dress/finishToday`).then(response => response.data);
    return response;
}



export function useRentalsFinishDressesToday() {
    return useQuery([`rentalsDressesFinishToday`], async () => await getRentalsDressesFinishToday(),{
        staleTime: 1000 * 10 * 60,
    });


}