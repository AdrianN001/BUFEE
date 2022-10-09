import Login from './src/components/Login';
import Food_page from './src/components/food_page';
import Profile from './src/components/profile';
import Clerk from './src/components/clerk_page';


import React, { useEffect, useRef, useState } from 'react';
import { get_liked } from './src/funcs/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface LOGIN_PAYLOAD
{
  can_login: boolean,
  om_id: string
}

export default function App() {
  const [loged_in, setLogedIn] = useState<boolean>(false) 
  const [globalOMID, setglobalOMID] = useState<string>("")

  console.log(loged_in)
  
  console.log(globalOMID )

  


  return ( 
    
    
     
    !loged_in ? <Login  onLogin = {({can_login, om_id} : LOGIN_PAYLOAD) => {
          setLogedIn(can_login);
          setglobalOMID(om_id)
        }}/>
              : globalOMID !== "pagisz_bufe"
                ?<Food_page om_id = {globalOMID} setLogout ={(elem: boolean) => setLogedIn(elem)}/>
                : <Clerk/>
  
  
)

  

  return 
  
}
