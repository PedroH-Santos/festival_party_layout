import { useQuery } from "react-query";
import { api } from "../../api";
import { getAPIClient } from "../../axios";



interface IRequest {
    id: string | string[] | undefined;
    ctx?: any;
} 

export async function getRentalAccessories({ id,ctx } : IRequest): Promise<Rental> {
    const apiClient = getAPIClient(ctx);

    const response = await apiClient.get<Rental>(`/rental/accessory/detail/${id}`).then(response => response.data);
    return response;
}



export function useRentalAccessories({ id }: IRequest) {
    const response = useQuery([`rentalAccessory`,{id}], async () => await getRentalAccessories({id}),{
        staleTime: 1000 * 10 * 60,
    });
    return response;


}