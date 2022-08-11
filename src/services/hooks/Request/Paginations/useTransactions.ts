import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";

interface IRequest {
    ctx?: any;
    page?:number;
    search: string;
}

export interface ITransactionPagination {
    transactions: Transaction[],
    pagination: Pagination,
}


export async function getTransactions({page,search,ctx} : IRequest): Promise<ITransactionPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;

    const response = await apiClient.get<ITransactionPagination>(`/transaction/pagination?page=${page}&search=${search}`).then(response => response.data);

    return response;
}



export function useTransactions({page,search} : IRequest) {
    return useQuery([`transactions`,{page,search}], async () => await getTransactions({page,search}),{
        staleTime: 1000 * 10 * 60,
    });


}

