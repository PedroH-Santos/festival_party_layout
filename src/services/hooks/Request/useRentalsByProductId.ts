import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    product_id: string | undefined;
    ctx?: any;
}

export async function getRentalsByProductId({product_id,ctx }: IRequest): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/filter`, {
        params: {
            product_id,
        }
    }).then(response => response.data);

    return response;
}



export function useRentalsByProductId({product_id}: IRequest) {
    return useQuery([`rentalsProductId`,{product_id}], async () => await getRentalsByProductId({product_id}),{
        staleTime: 1000 * 10 * 60,
    });


}