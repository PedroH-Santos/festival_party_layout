import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    accessory_id: string | undefined;
    ctx?: any;
}

export async function getRentalsByIdAccessory({accessory_id,ctx }: IRequest): Promise<Rental[]> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental[]>(`/rental/accessory/filter`, {
        params: {
            accessory_id,
        }
    }).then(response => response.data);

    return response;
}



export function useRentalsByIdAccessory({accessory_id}: IRequest) {
    return useQuery([`rentalsByIdAccessory`,{accessory_id}], async () => await getRentalsByIdAccessory({accessory_id}),{
        staleTime: 1000 * 10 * 60,
    });


}