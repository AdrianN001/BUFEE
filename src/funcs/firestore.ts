import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { text } from "stream/consumers";

// async function main() {
//     const resp = await firestore().collection("users").doc("H5qLxIMMZqsC1YqNEjuj").get()

//     console.log(resp)
// } 
// main()

enum REGISTER_RESPONSE{
    INVALID_OMID,
    INVALID_CLASS,
    ALREADY_REGISTERED,

    OK
}
interface User_Model{
    _id?: any

    om_id: string,
    name: string,

    password:string,
    class_: string,
    
    
}
interface Order_Model{
    isDeleted?: boolean;
    isDone?:boolean,
    _id?: any

    name: string,
    _class: string,

    payload: string[],
    isPayed: boolean,
    

    om_id: string

    price: number, 

    timeCreated: string
}



async function add_User(om_id: string,password: string,name: string,class_: string): Promise< REGISTER_RESPONSE >{

    const CLASS_REGEX: RegExp = /^(9|(10)|(11)|(12)|(13))( |\.|\. |)([A-Ea-e])$/

    
    if( (await firestore().collection("users").where("om_id", "==", om_id).get()).docs.length !== 0)
    {
        return REGISTER_RESPONSE.ALREADY_REGISTERED;
    }
    else if(!CLASS_REGEX.test(class_))
    {
        return REGISTER_RESPONSE.INVALID_CLASS
    }
    else{
        
        firestore().collection("users").add({om_id, password,name,class_}).then(() => console.log('User Added'))
        return REGISTER_RESPONSE.OK;

    }
}
function get_password(om_id: string) : Promise< string >  {
    return firestore().collection("users").where("om_id", "==", om_id).get().then(
        data => (data.docs[0].data() as User_Model)['password']
    ).catch(
        err => {console.log("Valami nem jo"); 
        return ""}
    )
                                                            
    
    
}

async function get_data(om_id: string): Promise< User_Model >{
    const resp = await firestore().collection("users").where("om_id", "==", om_id).get()

    const data = resp.docs[0]
    return (data.data() as User_Model)
                                          

    
}



export {Order_Model, add_User, REGISTER_RESPONSE, get_password, get_data, User_Model}