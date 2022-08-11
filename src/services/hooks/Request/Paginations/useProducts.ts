import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";


interface IRequest {
    ctx?: any;
    page?:number;
    search: string;
}

export interface IProductsPagination {
    products: Product[],
    pagination: Pagination,
}



export async function getProducts({page,search,ctx} : IRequest): Promise<IProductsPagination> {

    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IProductsPagination>(`/product/pagination?page=${currentPage}&search=${search}`).then(response => response.data);
    return response;
}



export function useProducts({page,search} : IRequest) {
    return useQuery([`products`,{page,search}], async () => await getProducts({page,search}),{
        staleTime: 1000 * 10 * 60,
    });


}