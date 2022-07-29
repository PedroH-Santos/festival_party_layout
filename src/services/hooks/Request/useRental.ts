import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getRental({ id,ctx } : IRequest): Promise<Rental> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental>(`/rental/detail/${id}`).then(response => response.data);
    return response;
}



export function useRental({ id }: IRequest) {
    const response = useQuery([`rental`,{id}], async () => await getRental({id}),{
        staleTime: 1000 * 10 * 60,
    });
    return response;


}