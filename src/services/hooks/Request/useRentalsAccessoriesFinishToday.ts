import { useQuery } from "react-query";
import { api } from "../../api";




export async function getRentalsAccessoriesFinishToday(): Promise<Rental[]> {

    const response = await api.get<Rental[]>(`/rental/accessory/finishToday`).then(response => response.data);
    return response;
}



export function useRentalsAccessoriesFinishToday() {
    return useQuery([`rentalsAccessoriesFinishToday`], async () => await getRentalsAccessoriesFinishToday(),{
        staleTime: 1000 * 10 * 60,
    });


}