import firestore from "@react-native-firebase/firestore";

async function main() {
    const resp = await firestore().collection("users").doc("H5qLxIMMZqsC1YqNEjuj").get()

    console.log(resp)
} 
main()

async function add_User(om_id: string,password: string,name: string,class_: string){

    if (await firestore().collection("users").where("om_id", "==", om_id).get() != null)
    {
        return;
    }


    firestore().collection("users").add({om_id, password,name,class_, previus_order: []}).then(() => console.log('User Added'))
}

export {add_User}