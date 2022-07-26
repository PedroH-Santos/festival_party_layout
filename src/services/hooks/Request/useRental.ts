import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getRental({ id } : IRequest): Promise<Rental> {

    const response = await api.get<Rental>(`/rental/dress/detail/${id}`).then(response => response.data);
    return response;
}



export function useRental({ id }: IRequest) {
    const response = useQuery([`rental`,{id}], async () => await getRental({id}),{
        staleTime: 1000 * 10 * 60,
    });
    return response;


}