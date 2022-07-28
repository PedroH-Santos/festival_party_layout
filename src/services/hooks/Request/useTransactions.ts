import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



export async function getTransactions(ctx?:any): Promise<Transaction[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Transaction[]>(`/transaction`).then(response => response.data);

    return response;
}



export function useTransactions() {
    return useQuery([`transactions`], async () => await getTransactions(),{
        staleTime: 1000 * 10 * 60,
    });


}

