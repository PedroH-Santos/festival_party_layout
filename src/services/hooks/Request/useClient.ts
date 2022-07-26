import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getClient({ id } : IRequest): Promise<Client> {

    const response = await api.get<Client>(`/client/detail/${id}`).then(response => response.data);
    return response;
}



export function useClient({ id }: IRequest) {
    return useQuery([`client`,{id}], async () => await getClient({id}),{
        staleTime: 1000 * 10 * 60,
    });


}