import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";


interface IRequest {
    ctx?: any;
    page?:number;
    search: string;
}

export interface IUserPagination {
    users: User[],
    pagination: Pagination,
}


export async function getUsers({page,search,ctx} : IRequest): Promise<IUserPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    const response = await apiClient.get<IUserPagination>(`/user/pagination?page=${currentPage}&search=${search}`).then(response => response.data);
    return response;
}



export function useUsers({page,search}: IRequest) {
    return useQuery([`users`, { page,search }], async () => await getUsers({page,search}),{
        staleTime: 1000 * 10 * 60,
    });


}