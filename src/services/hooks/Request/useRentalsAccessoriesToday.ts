import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsAccessoriesToday(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/accessory/today`).then(response => response.data);
    return response;
}



export function useRentalsAccessoriesToday() {
    return useQuery([`rentalsAccessoriesToday`], async () => await getRentalsAccessoriesToday(),{
        staleTime: 1000 * 10 * 60,
    });


}