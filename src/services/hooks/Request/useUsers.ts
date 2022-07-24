import { useQuery } from "react-query";
import { api } from "../../api";




export async function getUsers(): Promise<User[]> {

    const response = await api.get<User[]>(`/user`).then(response => response.data);
    return response;
}



export function useUsers() {
    return useQuery([`users`], async () => await getUsers(),{
        staleTime: 1000 * 10 * 60,
    });


}