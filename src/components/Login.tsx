import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button, KeyboardAvoidingView, Pressable, Animated, Touchable, TouchableWithoutFeedback, Alert, AsyncStorage} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';
import Register_Page from './register';
//import FlashMessage from 'react-native-flash-message';
import try_login,{ LOGIN_RESPONSE } from '../funcs/login';

import { 
  Bangers_400Regular 
} from '@expo-google-fonts/bangers'
import { 
  BubblerOne_400Regular 
} from '@expo-google-fonts/bubbler-one'

import AppLoading from 'expo-app-loading';
import React from 'react';


const button_function = async(om_id: string, password: string) => 
{
    const response = await try_login(om_id, password);

    switch (response)
    {
      case LOGIN_RESPONSE.WRONG_OMID:
        Alert.alert("HIBA", "Ezzel az OM Azonositóval még nem regisztráltak");
        break;
      case LOGIN_RESPONSE.WRONG_PASSWORD:
        Alert.alert("HIBA", "Hibás Jelszó");
        break
      
    }

    return response === LOGIN_RESPONSE.OK ? true: false;
}


const get_prev_log = async(): Promise< string | null >  => {
 
  const prev = await AsyncStorage.getItem("last_login") ?? await AsyncStorage.getItem("registered_user")

  return prev 
}

export default function Login(props: any) {

  let [om_id, setOMID] = useState("")
  let [password, setPassword] = useState("")
  let [register, setRegister] = useState(false)

  
  let [fontsLoad] = useFonts(
    {
      Bangers_400Regular,
      BubblerOne_400Regular,
      'Glory': require("../../assets/fonts/Glory.ttf")
    }
  )

  useEffect(() => {

    (async() => {
      setOMID(await get_prev_log() ?? "")
    })()

  }, [])

  if (!fontsLoad){
    return <AppLoading />;
  }


  return (
      
      
    
    <View style={styles.container} >
      

      { !register ?
      <>
          <Image style = { bufee_logo_style.burger} source={require("../../assets/bufee_logo.png")}/>

          <Text style = {bufee_logo_style.text}>BUFEE</Text>

          <View style = {input_styles.padding} >
            <TextInput value = {om_id}  onChangeText= {text => setOMID(text)} style = {input_styles.om_id} placeholder = "Felhasználó Név"/>

            <TextInput  value = {password} secureTextEntry = {true} onChangeText= {text => setPassword(text)} style = {input_styles.password} placeholder='Jelszó'/> 

            <View style = {input_styles.button} >
              <Button title = 'Bejelentkezés' color= "#E17676" onPress={async () =>{
                        const can_login = await button_function(om_id,password);
                        if (!can_login) return;
                        else {
                          props.onLogin({can_login, om_id})
                          AsyncStorage.setItem("last_login", om_id)
                          
                        }
                        
                }}/>
            </View>
          </View>



          <View style = {input_styles.register}>
            <Pressable onPress={() => setRegister(true)}><Text >Nincs még Fiókod?</Text></Pressable>
          </View>
        </>
            :
          
          <View style = {style.register}>
            
              <TouchableWithoutFeedback onPress={()=>setRegister(false)}><Image source = {require("../../assets/exit_button.png")} style = {{top: "-10%",right: "10%", width: 25, height: 25, zIndex:2}}></Image></TouchableWithoutFeedback>
              <Register_Page button_function = {() => setRegister(false)}/>
            
          </View>
         
        
        }






      <StatusBar style="auto" />

    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const bufee_logo_style = StyleSheet.create(
  {
    burger: {
      width: 240,
      height: 240,
      position: 'absolute', 
      top: "-5%",

      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 19,

      
    },
    text: 
    {
      fontFamily : "Glory",
      color: "#E17676",
      fontSize: 40, 
      top: "-5%"
    }
  }
)
const input_styles = StyleSheet.create(
  {
    padding: {
      top: "-3%",
      width: "60%",
      height: "35%",
      backgroundColor: "#262626",
      borderRadius: 50,

      alignItems: 'center',
      alignSelf: 'center',


      shadowColor: "#827e7e",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      

      elevation: 12,
    },
    om_id:{
     
      fontFamily:'BubblerOne_400Regular',
      
      top: "10%",

      height: 40,
      width: 190,
      backgroundColor: "#8B8B8B",
      borderRadius: 10,
      fontSize:20,
      textAlign:"center"
    },
    password: {
      fontFamily:'BubblerOne_400Regular',
      
      top: "20%",
      height: 40,
      width: 190,

      backgroundColor: "#8B8B8B",
      borderRadius: 10,
      fontSize:15,
      textAlign:"center"
    },
    button: {
      
      top:"35%"
      
      
      
    },
    register:
    {
      position:"absolute",
      color:'#000',
      bottom: "27%"
    }
    
  }
)

const style = StyleSheet.create({
  register:{
    top:"-2%",
    height:"70%",
    width:"60%",
    
  },
  register_Background:
  {
    height:"100%",
    width:"100%",

  }
})