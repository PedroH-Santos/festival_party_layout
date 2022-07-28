import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?: any;
} 

export async function getUser({ id,ctx } : IRequest): Promise<User> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<User>(`/user/detail/${id}`).then(response => response.data);
    return response;
}



export function useUser({ id }: IRequest) {
    return useQuery([`user`,{id}], async () => await getUser({id}),{
        staleTime: 1000 * 10 * 60,
    });


}