import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import Login from "../components/Form/Login";

export default function Home() {
  return (
    <>
      <Login />
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'festivalParty.token': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/list/today",
        permanent: false,
      }
    }
  }

  return {
    props: {
    }
  };

}