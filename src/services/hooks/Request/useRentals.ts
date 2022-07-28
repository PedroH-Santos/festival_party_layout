import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    dress_id: string | undefined;
    ctx?: any;
}

export async function getRentals({dress_id,ctx }: IRequest): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/dress/filter`, {
        params: {
            dress_id,
        }
    }).then(response => response.data);

    return response;
}



export function useRentals({dress_id}: IRequest) {
    return useQuery([`rentalsDressId`,{dress_id}], async () => await getRentals({dress_id}),{
        staleTime: 1000 * 10 * 60,
    });


}