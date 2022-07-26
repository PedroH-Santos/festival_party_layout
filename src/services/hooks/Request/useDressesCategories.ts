import { useQuery } from "react-query";
import { api } from "../../api";




export async function getDressesCategories(): Promise<CategoryDress[]> {

    const response = await api.get<CategoryDress[]>(`/dress/category`).then(response => response.data);
    return response;
}



export function useDressesCategories() {
    return useQuery([`dressesCategories`], async () => await getDressesCategories(),{
        staleTime: 1000 * 10 * 60,
    });


}