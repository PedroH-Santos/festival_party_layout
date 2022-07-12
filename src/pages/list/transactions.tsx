import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListTransactions from "../../components/List/Transactions";
import Title from "../../components/Title";

export default function Transactions() {
    return (
      <>
            <Header />
            <Body>
                <>
                    <Title icon={faCircleDollarToSlot} title="Finanças" size="lg" />
                    <ListTransactions />
                </>
            </Body>
      </>
    )
  }