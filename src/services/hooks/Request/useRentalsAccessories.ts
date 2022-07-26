import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsAccessories(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/accessory`).then(response => response.data);
    return response;
}



export function useRentalsAccessories() {
    return useQuery([`rentalsAccessories`], async () => await getRentalsAccessories(),{
        staleTime: 1000 * 10 * 60,
    });


}