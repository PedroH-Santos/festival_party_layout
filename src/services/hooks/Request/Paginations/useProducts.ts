import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";


interface IRequest {
    ctx?: any;
    page?:number;
    urlSearch: string;
}

export interface IProductsPagination {
    products: Product[],
    pagination: Pagination,
}



export async function getProducts({page,urlSearch,ctx} : IRequest): Promise<IProductsPagination> {

    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IProductsPagination>(`/product/pagination?page=${currentPage}&${urlSearch}`).then(response => response.data);
    return response;
}



export function useProducts({page,urlSearch} : IRequest) {
    return useQuery([`products`,{page,urlSearch}], async () => await getProducts({page,urlSearch}),{
        staleTime: 1000 * 10 * 60,
    });


}