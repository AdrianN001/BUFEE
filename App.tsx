import Login from './src/components/Login';
import Food_page from './src/components/food_page';

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


  // return ( <Login  onLogin = {({can_login, om_id} : LOGIN_PAYLOAD) => {
  //   setLogedIn(can_login);
  //   setglobalOMID(om_id)
  // }}/>)

  return <Food_page></Food_page>
  
}
