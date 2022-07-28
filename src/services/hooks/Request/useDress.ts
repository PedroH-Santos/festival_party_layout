import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getDress({ id,ctx } : IRequest): Promise<Dress> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Dress>(`/dress/detail/${id}`).then(response => response.data);
    return response;
}



export function useDress({ id }: IRequest) {
    return useQuery([`dress`,{id}], async () => await getDress({id}),{
        staleTime: 1000 * 10 * 60,
    });


}