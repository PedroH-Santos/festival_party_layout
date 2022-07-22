import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    accessory_id: string | undefined;
}

export async function getRentalsByIdAccessory({accessory_id }: IRequest): Promise<Rental[]> {
    const response = await api.get<Rental[]>(`/rental/accessory/filter`, {
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