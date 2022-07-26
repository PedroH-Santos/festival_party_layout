import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getAccessoriesCategory({ id } : IRequest): Promise<AccessoryCategory> {

    const response = await api.get<AccessoryCategory>(`/accessory/category/detail/${id}`).then(response => response.data);
    return response;
}



export function useAccessoriesCategory({ id }: IRequest) {
    return useQuery([`accessoriesCategory`,{id}], async () => await getAccessoriesCategory({id}),{
        staleTime: 1000 * 10 * 60,
    });


}