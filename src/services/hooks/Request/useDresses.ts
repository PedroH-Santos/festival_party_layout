import { useQuery } from "react-query";
import { api } from "../../api";




export async function getDresses(): Promise<Dress[]> {

    const response = await api.get<Dress[]>(`/dress`).then(response => response.data);
    return response;
}



export function useDresses() {
    return useQuery([`dresses`], async () => await getDresses(),{
        staleTime: 1000 * 10 * 60,
    });


}