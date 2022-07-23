import { useQuery } from "react-query";
import { api } from "../../api";



export async function getTransactions(): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>(`/transaction`).then(response => response.data);

    return response;
}



export function useTransactions() {
    return useQuery([`transactions`], async () => await getTransactions(),{
        staleTime: 1000 * 10 * 60,
    });


}

