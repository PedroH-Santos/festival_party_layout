import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getDressesCategories(ctx?:any): Promise<CategoryDress[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<CategoryDress[]>(`/dress/category`).then(response => response.data);
    return response;
}



export function useDressesCategories() {
    return useQuery([`dressesCategories`], async () => await getDressesCategories(),{
        staleTime: 1000 * 10 * 60,
    });


}