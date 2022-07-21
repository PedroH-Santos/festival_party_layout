import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getDress({ id } : IRequest): Promise<Dress> {

    const response = await api.get<Dress>(`/dress/detail/${id}`).then(response => response.data);
    return response;
}



export function useDress({ id }: IRequest) {
    return useQuery([`dress`,{id}], async () => await getDress({id}));


}