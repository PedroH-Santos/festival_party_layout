import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getUsers(ctx?:any): Promise<User[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<User[]>(`/user`).then(response => response.data);
    return response;
}



export function useUsers() {
    return useQuery([`users`], async () => await getUsers(),{
        staleTime: 1000 * 10 * 60,
    });


}