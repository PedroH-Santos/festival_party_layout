import { faCalendar, faShirt } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";
import ListRentals from "../../../components/List/Rentals";
import Title from "../../../components/Title";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useFilter } from "../../../services/hooks/useFilter";
import { getRentals, IRentalPagination, useRentals } from "../../../services/hooks/Request/Paginations/useRentals";
import moment from "moment";




interface IParams {
    page: number;
}


interface RentalsProps {
    page: number;
    start_date: string;
    expected_delivery_date: string;
}


export default function Rentals({ expected_delivery_date, start_date, page }: RentalsProps) {

    const { filters, insertNewFilter, changeValueFilter, getUrlSearch } = useFilter();
    useEffect(() => {
        const filters = [
            {
                name: "start_date",
                value: (start_date) ? moment(start_date).format() : '',
                type: "date",
            },
            {
                name: "expected_delivery_date",
                value: (expected_delivery_date) ? moment(expected_delivery_date).format() : '',
                type: "date",
            }
        ]
        insertNewFilter(filters);
    }, [])

     const { data: response, error } = useRentals({page,urlSearch: getUrlSearch()});
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faCalendar} title="Alúgueis" size="lg" />
                    <ListRentals rentals={response?.rentals} pagination={response?.pagination} changeValueFilter={changeValueFilter} filters={filters} />

                </>
            </Body>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token': token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const start_date = (ctx.query.start_date) ? moment(ctx.query.start_date as string).format() : '';
    const expected_delivery_date = (ctx.query.expected_delivery_date) ? moment(ctx.query.expected_delivery_date as string).format()  : '';
    const urlSearch = `start_date=${start_date}&expected_delivery_date=${expected_delivery_date}`;
    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IRentalPagination>([`rentals`, { page, urlSearch }], async () => await getRentals({ page, urlSearch }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            start_date,
            expected_delivery_date,
            page,
        }
    };
}
