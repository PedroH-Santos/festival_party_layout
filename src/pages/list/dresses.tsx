import { faShirt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useQuery } from "react-query";
import Body from "../../components/Body";
import Header from "../../components/Header";
import ListDresses from "../../components/List/Dresses";
import Title from "../../components/Title";
import { queryClient } from "../../services/queryClient";
 
export default function Dresses() {

    const { data  } = useQuery('dresses', async () => {
        const response = await axios.get<Dress[]>('http://localhost:3333/dress');
        return response.data;
    })
    return (
        <div className="content">

            <Header />
            <Body>
                <>
                    <Title icon={faShirt} title="Vestidos" size="lg" />
                    <ListDresses dresses={data}/>
                </>
            </Body>
        </div>
    )
} 





