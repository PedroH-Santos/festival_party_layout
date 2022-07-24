import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getUser({ id } : IRequest): Promise<User> {

    const response = await api.get<User>(`/user/detail/${id}`).then(response => response.data);
    return response;
}



export function useUser({ id }: IRequest) {
    return useQuery([`user`,{id}], async () => await getUser({id}),{
        staleTime: 1000 * 10 * 60,
    });


}