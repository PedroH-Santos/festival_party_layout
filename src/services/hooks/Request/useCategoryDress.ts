import { useQuery } from "react-query";
import { api } from "../../api";





export async function getCategorysDress(): Promise<CategoryDress[]> {

    const response = await api.get<CategoryDress[]>(`/dress/category`).then(response => response.data);
    return response;
}



export function useCategoryDress() {
    return useQuery([`categorysDress`], async () => await getCategorysDress());


}