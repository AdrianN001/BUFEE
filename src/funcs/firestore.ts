import firestore from "@react-native-firebase/firestore";

async function main() {
    const resp = await firestore().collection("users").doc("H5qLxIMMZqsC1YqNEjuj").get()

    console.log(resp)
} 
main()

enum REGISTER_RESPONSE{
    INVALID_OMID,
    INVALID_CLASS,
    ALREADY_REGISTERED,

    OK
}


async function add_User(om_id: string,password: string,name: string,class_: string): Promise< REGISTER_RESPONSE >{

    const OMID_Regex: RegExp = /^72555(.{6})$/; 
    const CLASS_REGEX: RegExp = /^(9|(10)|(11)|(12)|(13))( |\.|\. |)([A-Ea-e])$/

    if(!OMID_Regex.test(om_id))
    {
        return REGISTER_RESPONSE.INVALID_OMID
    }
    else if  (await firestore().collection("users").where("om_id", "==", om_id).get() != null)
    {
        return REGISTER_RESPONSE.ALREADY_REGISTERED;
    }
    else if(!CLASS_REGEX.test(class_))
    {
        return REGISTER_RESPONSE.INVALID_CLASS
    }
    else{
        
        firestore().collection("users").add({om_id, password,name,class_, previus_order: []}).then(() => console.log('User Added'))
        return REGISTER_RESPONSE.OK;

    }
}

async function get_password(om_id: string) : Promise< string >  {
    const response = await firestore().collection("users").where("om_id", "==", om_id).get()

    return response.docs[0].data()['password']
                                                            
    
    
}

export {add_User, REGISTER_RESPONSE, get_password}