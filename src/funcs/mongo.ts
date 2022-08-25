import { MongoClient } from 'mongodb';
import  { User_Data } from '../classes/user';
const URI = "mongodb+srv://admindev123:admindev123@bufee.2mf2b8y.mongodb.net/";


const client = new MongoClient(URI)
const dbName = 'users'

async function main() {
    await client.connect()

    console.log("Succesfuly connected");

    const db = client.db(dbName)

    const collection = db.collection("users")

    return 'done.';
}

async function update_collection(om_id:string,password:string,name:string,class_:string) {
    await client.connect()
    
    console.log("Succesfuly connected");

    const db = client.db(dbName)

    const collection = db.collection("users")

    const insert_result = await collection.insertOne({om_id,password,name,class_})
    console.log("inserted result =>", insert_result)
}
export {update_collection}

main().then(console.log).catch(console.error).finally(() => client.close())