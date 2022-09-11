import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { FoodInterface } from "../components/food";
import {User_Model, Order_Model} from "./firestore"
import { get_data } from "./firestore";

const generate_payload = (_omid: string, _bucket: FoodInterface[], _isPayed: boolean): string => 
{
    /* 
     Payload generalas az csak is a vevo "adataibol jon" 
     Maradek adat a rendelesnel az ID, amivel lehet majd muveleteket vegezni vele.
     Valamint az "isDone", amivel lehet jelezni hogy kesz a rendeles,
     Es ezen fellul az ido
    */

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
    /*
     Firestoreba kikuld egy uj documentet, ami 3 dolgot tartalmaz
    */

    const current_orders = (await firestore().collection("queue").get()).docs.filter(adat => adat.data()["payload"].startsWith(om_id)).length
    console.log("Jelenleg ennyi rendelesed van: %i", current_orders)

    const data_payload = generate_payload(om_id,bucket, _isPayed)

    const last_item = await firestore().collection("queue").orderBy("order_id", "desc").limit(1).get()

    const last_index: number = parseInt(last_item.docs[0].data()['order_id'])
    
    const current_index = last_index + 1

    firestore().collection("queue").add(
        {
            payload : data_payload,
            order_id : current_index,
            isDone: false,
            timeCreated: new Date().toLocaleTimeString().replace("AM", "DE").replace("PM", "DU")
        }
    )
}

export async function listOrders()
{
    

    const data = (await firestore().collection("queue").orderBy("order_id","asc").get()).docs.slice(1)
    
    console.log(data.length)

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
        const {order_id, payload, timeCreated} = order["data"]();
        
        const [om_id, order_list, price, isPayed] = payload.split("<>")
        
        const {name, class_: _class} = await get_data(om_id)
        

        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
        
        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed ,isDone: false, timeCreated }
        return _order
    }))

    
    return await _order_list
    
}