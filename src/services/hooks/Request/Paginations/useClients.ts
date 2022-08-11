import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";

interface IRequest {
    ctx?: any;
    page?:number;
    search: string;
}

export interface IClientPagination {
    clients: Client[],
    pagination: Pagination,
}


export async function getClients({ctx,search,page}: IRequest): Promise<IClientPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IClientPagination>(`/client/pagination?page=${currentPage}&search=${search}`).then(response => response.data);
    return response;
}



export function useClients({search,page}: IRequest) {
    return useQuery([`clients`,{search,page}], async () => await getClients({search,page}),{
        staleTime: 1000 * 10 * 60,
    });


}