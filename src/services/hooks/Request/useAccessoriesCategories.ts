import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getAccessoriesCategories(ctx?:any): Promise<CategoryDress[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<CategoryDress[]>(`/accessory/category`).then(response => response.data);
    return response;
}



export function useAccessoriesCategories() {
    return useQuery([`accessoriesCategories`], async () => await getAccessoriesCategories(),{
        staleTime: 1000 * 10 * 60,
    });


}