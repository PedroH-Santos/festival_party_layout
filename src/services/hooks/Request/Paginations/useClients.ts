import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";

interface IRequest {
    ctx?: any;
    page?:number;
    urlSearch: string;
}

export interface IClientPagination {
    clients: Client[],
    pagination: Pagination,
}


export async function getClients({ctx,urlSearch,page}: IRequest): Promise<IClientPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IClientPagination>(`/client/pagination?page=${currentPage}&${urlSearch}`).then(response => response.data);
    return response;
}



export function useClients({urlSearch,page}: IRequest) {
    return useQuery([`clients`,{urlSearch,page}], async () => await getClients({urlSearch,page}),{
        staleTime: 1000 * 10 * 60,
    });


}