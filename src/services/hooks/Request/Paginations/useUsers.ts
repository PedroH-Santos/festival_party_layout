import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";


interface IRequest {
    ctx?: any;
    page?:number;
    filter?: string;
}

export interface IUserPagination {
    users: User[],
    pagination: Pagination,
}


export async function getUsers({page,filter,ctx} : IRequest): Promise<IUserPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;

    const response = await apiClient.get<IUserPagination>(`/user/pagination?page=${currentPage}&name=${filter}`).then(response => response.data);
    return response;
}



export function useUsers({page,filter}: IRequest) {
    return useQuery([`users`], async () => await getUsers({page,filter}),{
        staleTime: 1000 * 10 * 60,
    });


}