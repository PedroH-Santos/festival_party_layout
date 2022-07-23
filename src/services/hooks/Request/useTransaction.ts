import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getTransaction({ id } : IRequest): Promise<Transaction> {

    const response = await api.get<Transaction>(`/transaction/detail/${id}`).then(response => response.data);
    return response;
}



export function useTransaction({ id }: IRequest) {
    return useQuery([`transaction`,{id}], async () => await getTransaction({id}),{
        staleTime: 1000 * 10 * 60,
    });


}