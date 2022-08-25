import firestore from "@react-native-firebase/firestore";
import {get_password} from "./firestore"
import { Alert } from "react-native";

export enum LOGIN_RESPONSE{
    WRONG_PASSWORD,
    WRONG_OMID,

    OK
}

export default async function try_login( om_id: string, password: string ) : Promise<LOGIN_RESPONSE>
{
    console.log(om_id,password, "fasz")
    if  (await (await firestore().collection("users").where("om_id", "==", om_id).get()).docs.length == 0)
    {
        console.log("rossz omid")
        return LOGIN_RESPONSE.WRONG_OMID
    } else if (await get_password(om_id) != password)
    {   
        console.log("rossz jelszo")
        return LOGIN_RESPONSE.WRONG_PASSWORD
    } else 
    {
        console.log('helyes minden')
        return LOGIN_RESPONSE.OK
    }
} 