import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";


interface IRequest {
    ctx?: any;
    page?:number;
    urlSearch: string;
}

export interface IUserPagination {
    users: User[],
    pagination: Pagination,
}


export async function getUsers({page,urlSearch,ctx} : IRequest): Promise<IUserPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IUserPagination>(`/user/pagination?page=${currentPage}&${urlSearch}`).then(response => response.data);
    return response;
}



export function useUsers({page,urlSearch}: IRequest) {
    return useQuery([`users`, { page,urlSearch }], async () => await getUsers({page,urlSearch}),{
        staleTime: 1000 * 10 * 60,
    });


}