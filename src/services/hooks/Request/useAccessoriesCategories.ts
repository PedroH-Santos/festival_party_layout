import { useQuery } from "react-query";
import { api } from "../../api";




export async function getAccessoriesCategories(): Promise<CategoryDress[]> {

    const response = await api.get<CategoryDress[]>(`/accessory/category`).then(response => response.data);
    return response;
}



export function useAccessoriesCategories() {
    return useQuery([`accessoriesCategories`], async () => await getAccessoriesCategories(),{
        staleTime: 1000 * 10 * 60,
    });


}