import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getAccessory({ id } : IRequest): Promise<Accessory> {

    const response = await api.get<Accessory>(`/accessory/detail/${id}`).then(response => response.data);
    return response;
}



export function useAccessory({ id }: IRequest) {
    return useQuery([`accessory`,{id}], async () => await getAccessory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}