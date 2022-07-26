import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getDressesCategory({ id } : IRequest): Promise<DressCategory> {

    const response = await api.get<DressCategory>(`/dress/category/detail/${id}`).then(response => response.data);
    return response;
}



export function useDressesCategory({ id }: IRequest) {
    return useQuery([`dressesCategory`,{id}], async () => await getDressesCategory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}