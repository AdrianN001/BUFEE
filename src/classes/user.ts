class User
{
    private name: string ;
    private class_: string;

    private om_id: string;
    private password: string; //encrypted
    
    private prev_orders: string[];


    constructor( userdata: User_Data ){

        this.name = userdata.name
        this.class_ = userdata.class_

        this.om_id = userdata.om_id
        this.password = userdata.password

        this.prev_orders = userdata.prev_orders

    }

    get _name()
    {
        return this.name
    }
    get _class()
    {
        return this.class_
    }
    get _omid()
    {
        return this.om_id
    }






}

interface User_Data{
    _id?: any

    om_id: string,
    name: string,

    password:string,
    class_: string,
    
    prev_orders: string[]
}

/*                   8     +       4     = 12 hossz
    order: string = {datum}{ido: 24oras formatumban}{elem\b....}{price}
                                                    elem\b...,
                                                    aholis elem az index-e a termeknek
                                                    es \b lesz a valaszto
*/

export {User_Data}
export default User