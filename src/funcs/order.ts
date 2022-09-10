import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { FoodInterface } from "../components/food";
import {User_Model, Order_Model} from "./firestore"
import { get_data } from "./firestore";

const generate_payload = (_omid: string, _bucket: FoodInterface[], _isPayed: boolean): string => 
{
    

    let second_part: string = ""
    let sum_price: number = 0

    for (const elem of _bucket)
    {
        let current_part: string = `(${elem.nev}/h${elem.price})/v`;
        sum_price += parseInt(elem.price);
        second_part = second_part.concat(current_part)
    }

    return `${_omid}<>${second_part}<>${sum_price}<>${_isPayed}`;
}


export default async function addOrder(om_id: string, bucket: FoodInterface[], _isPayed: boolean) : Promise <void> 
{
    
    const data_payload = generate_payload(om_id,bucket, _isPayed)

    const last_item = await firestore().collection("queue").orderBy("order_id", "desc").limit(1).get()

    const last_index: number = parseInt(last_item.docs[0].data()['order_id'])
    
    const current_index = last_index + 1

    firestore().collection("queue").add(
        {
            payload : data_payload,
            order_id : current_index       
        }
    )

    //Alert.alert(`Elozo ${last_index}`, `Mostani ${current_index}`)
}

export async function listOrders()
{
    

    const data = (await firestore().collection("queue").orderBy("order_id","asc").get()).docs.slice(1)
    
    console.log(data.length)

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
        const {order_id, payload} = order["data"]();
        
        const [om_id, order_list, price, isPayed] = payload.split("<>")
        
        const {name, class_: _class} = await get_data(om_id)
        

        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
        
        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed }
        return _order
    }))

    
    return await _order_list
    
}