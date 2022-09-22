import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { FoodInterface } from "../components/food";
import {User_Model, Order_Model} from "./firestore"
import { get_data } from "./firestore";

const generate_payload = (_bucket: FoodInterface[], _isPayed: boolean): string => 
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

    return `${second_part}<>${sum_price}<>${_isPayed}`;
}


export default async function addOrder(om_id: string, bucket: FoodInterface[], _isPayed: boolean) : Promise <void> 
{
    /*
     Firestoreba kikuld egy uj documentet, ami 3 dolgot tartalmaz
    */

    const current_orders = (await firestore().collection("queue").get()).docs.filter(adat => adat.data()["payload"].startsWith(om_id)).length
    console.log("Jelenleg ennyi rendelesed van: %i", current_orders)

    const data_payload = generate_payload(bucket, _isPayed)

    const last_item = await firestore().collection("queue").orderBy("order_id", "desc").limit(1).get()

    const last_index: number = parseInt(last_item.docs[0].data()['order_id'])
    
    const current_index = last_index + 1

    firestore().collection("queue").add(
        {
            payload : data_payload,
            order_id : current_index,
            isDone: false,
            isDeleted: false,

            om_id: om_id,
            timeCreated: new Date().toLocaleTimeString().replace("AM", "DE").replace("PM", "DU")
        }
    )
}

const translate_data = async(data: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]): Promise<Order_Model[]> => {

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
        const {order_id, payload, timeCreated, isDeleted, isDone} = order["data"]();
        
        const [order_list, price, isPayed_string] = payload.split("<>")
        const isPayed: boolean = isPayed_string === "true" ? true : false

        const om_id = order.data()["om_id"]
        
        const {name, class_: _class} = await get_data(om_id)
        

        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
        
        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed  ,timeCreated, om_id: om_id }
        return _order
    }))

    return await _order_list
    
    
}

export async function listOrders()
{
    // Az adatbazisban levo adatokbol visszad egy egyszerubben feldolgozhato adatstrukturat

    const data = (await firestore().collection("queue").orderBy("order_id","asc").get()).docs.slice(1)
    
    console.log(data.length)

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
        const {order_id, payload, timeCreated, isDeleted, isDone} = order["data"]();
        
        const [order_list, price, isPayed_string] = payload.split("<>")
        const isPayed: boolean = isPayed_string === "true" ? true : false

        const om_id = order.data()["om_id"]
        
        const {name, class_: _class} = await get_data(om_id)
        

        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
        
        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed  ,timeCreated, om_id: om_id }
        return _order
    }))


    return (await _order_list)
    
}
export async function list_finished_orders()
{
    // Az adatbazisban levo adatokbol visszad egy egyszerubben feldolgozhato adatstrukturat

    const data = (await firestore().collection("finished_orders").orderBy("order_id","asc").get()).docs
    
    console.log(data.length)

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
        const {order_id, payload, timeCreated, isDeleted, isDone} = order["data"]();
        
        const [order_list, price, isPayed_string] = payload.split("<>")
        const isPayed: boolean = isPayed_string === "true" ? true : false

        const om_id = order.data()["om_id"]
        
        const {name, class_: _class} = await get_data(om_id)
        

        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
        
        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed ,timeCreated, om_id: om_id }
        return _order
    }))


    return (await _order_list)
    
}


export const ITEMS_PER_PAGE = 3 // ami gyakorlatilag 3 

export const listOrder_Site = async (oldal: number) => {
    if (oldal < 1){return ;}

    


    /*
            const endAtRes = await db.collection('cities')
        .orderBy('population')
        .endAt(1000000)
        .get();
  */
   //const data = (await firestore().collection("queue").orderBy("order_id","asc").startAfter((( oldal - 1 ) * ITEMS_PER_PAGE)).endAt((oldal * ITEMS_PER_PAGE) + 1).get()).docs
   const data = (await firestore().collection("queue").orderBy("order_id","asc").get()).docs.slice(ITEMS_PER_PAGE - 1 * oldal, ITEMS_PER_PAGE * oldal + 1)
    console.log(data)
    

    

    let _order_list: Promise <Order_Model[]> = Promise.all( data.map(async (order)=>{
        
                                                        const {order_id, payload, timeCreated} = order["data"]();
                                                        
                                                        const [order_list, price, isPayed_string] = payload.split("<>")
                                                        const isPayed: boolean = isPayed_string === "true" ? true : false
                                                
                                                        const om_id = order.data()["om_id"]
                                                        
                                                        const {name, class_: _class} = await get_data(om_id)
                                                        
                                                
                                                        const orders = order_list.split("/v").map((etel:string) => etel.split("/h")[0].substring(1))
                                                        
                                                        const _order: Order_Model = {_id: order_id, name, _class, payload: orders, price,isPayed ,timeCreated, om_id: om_id }
                                                        return _order
                                                    }))

                                                
                                                
        return (await _order_list)
}

export const list_client_orders = async (om_id: string) : Promise <Order_Model[]> => {
    const inQueue = (await firestore().collection("queue").where("om_id", "==", om_id).get()).docs
    const inDeleted = (await firestore().collection("deleted_orders").where("om_id", "==", om_id).get()).docs
    const inFinished = (await firestore().collection("finished_orders").where("om_id", "==", om_id).get()).docs

    return [...(await translate_data(inQueue)).map(adat => {return {...adat, isDone: false, isDeleted: false}}) // metaadatnak hozzaadni rendeleshez

          , ... (await translate_data(inFinished)).map(adat => {return {...adat,isDone: true, isDeleted:false}})

          , ...(await translate_data(inDeleted)).map(adat => {return {...adat, isDone:false, isDeleted:true}})]
    
}