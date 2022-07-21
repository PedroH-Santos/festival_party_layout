import { useQuery } from "react-query";
import { api } from "../../api";



interface IRequest {
    dress_id: string | undefined;
}

export async function getRentals({dress_id }: IRequest): Promise<Rental[]> {
    const response = await api.get<Rental[]>(`/rental/dress/filter`, {
        params: {
            dress_id,
        }
    }).then(response => response.data);

    return response;
}



export function useRentals({dress_id}: IRequest) {
    return useQuery([`rentalsDressId`,{dress_id}], async () => await getRentals({dress_id}));


}