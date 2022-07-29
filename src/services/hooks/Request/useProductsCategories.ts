import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getProductsCategories(ctx?:any): Promise<ProductCategory[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<ProductCategory[]>(`/product/category`).then(response => response.data);
    return response;
}



export function useProductsCategories() {
    return useQuery([`productsCategories`], async () => await getProductsCategories(),{
        staleTime: 1000 * 10 * 60,
    });


}