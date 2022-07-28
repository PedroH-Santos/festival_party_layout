import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?:any;
} 

export async function getTransaction({ id,ctx } : IRequest): Promise<Transaction> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Transaction>(`/transaction/detail/${id}`).then(response => response.data);
    return response;
}



export function useTransaction({ id }: IRequest) {
    return useQuery([`transaction`,{id}], async () => await getTransaction({id}),{
        staleTime: 1000 * 10 * 60,
    });


}