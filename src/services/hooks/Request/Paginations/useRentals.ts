import { useQuery } from "react-query";
import { api } from "../../../api";
import { getAPIClient } from "../../../axios";
import { Filters } from "../../useFilter";


interface IRequest {
    ctx?: any;
    page?:number;
    urlSearch: string;
}

export interface IRentalPagination {
    rentals: Rental[],
    pagination: Pagination,
}



export async function getRentals({ctx,page,urlSearch}:IRequest): Promise<IRentalPagination> {
    const apiClient = getAPIClient(ctx);
    const currentPage = (!page) ? 1 : page;
    

    const response = await apiClient.get<IRentalPagination>(`/rental/pagination?page=${currentPage}&${urlSearch}`).then((response: { data: any; }) => response.data);

    return response;
}



export function useRentals({page,urlSearch}: IRequest) {
    return useQuery([`rentals`,{page,urlSearch}], async () => await getRentals({page,urlSearch}),{
        staleTime: 1000 * 10 * 60,
    });


}