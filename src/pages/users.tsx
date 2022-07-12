import { faUser } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";
import Header from "../components/Header";

import ListUsers from "../components/List/Users";
import Title from "../components/Title";

export default function Users() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faUser} title="Usuários" size="lg" />
                    <ListUsers />
                </>
            </Body>
      </>
    )
  }