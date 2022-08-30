import firestore from "@react-native-firebase/firestore";
import { FoodInterface } from "../components/food";
import {User_Model} from "./firestore"

const generate_payload = (_omid: string, _bucket: FoodInterface[]): string => 
{
    

    let second_part: string = ""

    for (const elem of _bucket)
    {
        let current_part: string = `(${elem.nev}/h${elem.price})/v`
        second_part = second_part.concat(current_part)
    }

    return `${_omid}<>${second_part}`;
}


export default async function addOrder(om_id: string, bucket: FoodInterface[]) : Promise <void> 
{
    
    const data_payload = generate_payload(om_id,bucket)

    const last_item = await firestore().collection("queue").orderBy("order_id", "asc").limit(1).get()

    const last_index: number = parseInt(last_item.docs[0].data()['order_id'])

    firestore().collection("queue").add(
        {
            payload : data_payload,
            order_id : last_index + 1       
        }
    )
}

