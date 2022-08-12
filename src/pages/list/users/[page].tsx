import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";

import ListUsers from "../../../components/List/Users";
import Title from "../../../components/Title";
import { parseCookies } from "nookies";
import { getUsers, useUsers, IUserPagination } from "../../../services/hooks/Request/Paginations/useUsers";
import { useEffect, useState } from "react";
import { useFilter } from "../../../services/hooks/useFilter";


interface IParams {
    page: number;
}

interface UsersProps {
    page: number;
    search: string;
}


export default function Users({ page,search }: UsersProps) {
    const { filters, insertNewFilter, changeValueFilter, getUrlSearch } = useFilter();
    const { data: response, error } = useUsers({ page,urlSearch: getUrlSearch() });
    useEffect(() => {
        const filters = [
            {
                name: "search",
                value: (search) ? search : '',
                type: "text",
            },
        ]
        insertNewFilter(filters);
    }, [])
    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faUser} title="Usuários" size="lg" />
                    <ListUsers users={response?.users} pagination={response?.pagination} changeValueFilter={changeValueFilter} filters={filters}/>
                </>
            </Body>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token': token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const  search = (ctx.query.search) ? ctx.query.search as string : '';
    const urlSearch = `search=${search}`;

    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IUserPagination>([`users`, { page,urlSearch }], async () => await getUsers({ page, ctx,urlSearch }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            search,
        }
    };
}