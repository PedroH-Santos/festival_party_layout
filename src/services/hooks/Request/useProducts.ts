import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";




export async function getProducts(ctx?:any): Promise<Product[]> {

    const apiClient = getAPIClient(ctx);
    const response = await apiClient.get<Product[]>(`/product`).then(response => response.data);
    return response;
}



export function useProducts() {
    return useQuery([`products`], async () => await getProducts(),{
        staleTime: 1000 * 10 * 60,
    });


}