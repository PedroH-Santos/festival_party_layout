import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsDresses(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/dress`).then(response => response.data);
    return response;
}



export function useRentalsDresses() {
    return useQuery([`rentalsDresses`], async () => await getRentalsDresses(),{
        staleTime: 1000 * 10 * 60,
    });


}