import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";

interface IRequest {
    ctx?: any;
    page?:number;
    urlSearch: string;
}

export interface ITransactionPagination {
    transactions: Transaction[],
    pagination: Pagination,
}


export async function getTransactions({page,urlSearch,ctx} : IRequest): Promise<ITransactionPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;

    const response = await apiClient.get<ITransactionPagination>(`/transaction/pagination?page=${currentPage}&${urlSearch}`).then(response => response.data);

    return response;
}



export function useTransactions({page,urlSearch} : IRequest) {
    return useQuery([`transactions`,{page,urlSearch}], async () => await getTransactions({page,urlSearch}),{
        staleTime: 1000 * 10 * 60,
    });


}

