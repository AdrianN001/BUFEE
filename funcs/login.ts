import User from "../src/classes/user"
import axios from "axios";
const qs = require("qs")

async function login(om_id: string, password:string): Promise < void | User > 
{
    const data = qs.stringify(
        {
            'password': password,
            'institute_code': "gyszc-pattantyus",
            'grant_type': "password",
            'client_id': '919e0c1c-76a2-4646-a2fb-7085bbbf3c56',
            'userName':om_id
        }
    )

    const config = {
        method: 'post',
        url : "https://XXXXXXXXXX.e-kreta.hu/idp/api/v1/Token",
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Accept': 'application/json', 
            'User-Agent': 'Kreta.Ellenorzo/2.9.8.2020012301 '
        },
        data
    }

    axios(config).then(response => console.log(JSON.stringify(response)))
}

login("72555096472", "2006-04-08")


export default login