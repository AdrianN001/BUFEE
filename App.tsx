import Login from './src/components/Login';
import Food_page from './src/components/food_page';
import Profile from './src/components/profile';

import React, { useRef, useState } from 'react';

interface LOGIN_PAYLOAD
{
  can_login: boolean,
  om_id: string
}

export default function App() {
  const [loged_in, setLogedIn] = useState<boolean>(false) 
  const [globalOMID, setglobalOMID] = useState<string>("")

  console.log(loged_in)
  console.log(globalOMID)


  return ( 
    
    
     
    !loged_in ? <Login  onLogin = {({can_login, om_id} : LOGIN_PAYLOAD) => {
          setLogedIn(can_login);
          setglobalOMID(om_id)
        }}/>
              : <Food_page om_id = {globalOMID}/>
  
  
)

  

  return 
  
}
