import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import FormClient from "../../components/Form/Insert/Client";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export default function InsertClient() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faPlus} title="Cadastrar Cliente" size="lg" />
                    <FormClient />
                </>
            </Body>
      </>
    )
  }

  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'festivalParty.token': token } = parseCookies(ctx);
  
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }
  
    return {
      props: {
      }
    };
  
  }