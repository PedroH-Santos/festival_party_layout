import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Body from "../../../components/Body";
import Header from "../../../components/Header";

import ListUsers from "../../../components/List/Users";
import Title from "../../../components/Title";
import { parseCookies } from "nookies";
import { getUsers, useUsers, IUserPagination } from "../../../services/hooks/Request/Paginations/useUsers";
import { useState } from "react";


interface IParams {
    page: number;
}

interface UsersProps {
    page: number;
    filter: string;
}


export default function Users({ page,filter }: UsersProps) {
    const [search, setSearch] = useState<string>(filter)
    const { data: response, error } = useUsers({ page,search });

    return (
        <>
            <Header />
            <Body>
                <>
                    <Title icon={faUser} title="Usuários" size="lg" />
                    <ListUsers users={response?.users} pagination={response?.pagination} setSearch={setSearch} search={search}/>
                </>
            </Body>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token': token } = parseCookies(ctx);
    const { page } = ctx.params as unknown as IParams;

    const  search = (ctx.query.search) ? ctx.query.search as string : '';

    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IUserPagination>([`users`, { page,search }], async () => await getUsers({ page, ctx,search }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            page,
            filter: search,
        }
    };
}