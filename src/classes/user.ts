class User
{
    
    constructor(private userdata: User_Data){}

    public get_name(): string{
        return this.userdata['name']
    }
}

interface User_Data{
    _id?: any
    om_id: string,
    name: string,
    password:string,
    class_: string,
    prev_orders: object[]
}

export {User_Data}
export default User