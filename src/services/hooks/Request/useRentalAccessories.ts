import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    id: string | string[] | undefined;
} 

export async function getRentalAccessories({ id } : IRequest): Promise<Rental> {

    const response = await api.get<Rental>(`/rental/accessory/detail/${id}`).then(response => response.data);
    return response;
}



export function useRentalAccessories({ id }: IRequest) {
    const response = useQuery([`rentalAccessory`,{id}], async () => await getRentalAccessories({id}),{
        staleTime: 1000 * 10 * 60,
    });
    return response;


}