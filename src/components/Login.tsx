import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button, KeyboardAvoidingView, Pressable, Animated, Touchable, TouchableWithoutFeedback, Alert} from 'react-native';
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


export default function Login(props: any) {

  let [om_id, setOMID] = useState("")
  let [password, setPassword] = useState("")
  let [register, setRegister] = useState(false)

  


  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation,
      {
        toValue: 10,
        useNativeDriver:true
      }).start();
  })
  
  let [fontsLoad] = useFonts(
    {
      Bangers_400Regular,
      BubblerOne_400Regular,
      'Glory': require("../../assets/fonts/Glory.ttf")
    }
  )

  if (!fontsLoad){
    return <AppLoading />;
  }


  return (
      
      
    
    <View style={styles.container} >
      

      
        <Image style = { bufee_logo_style.burger} source={require("../../assets/bufee_logo.png")}/>

        <Text style = {bufee_logo_style.text}>BUFEE</Text>

        <View style = {input_styles.padding} >
          <TextInput value = {om_id} onChangeText= {text => setOMID(text)} style = {input_styles.om_id} placeholder = "                OM Azonositó"/>

          <TextInput  value = {password} onChangeText= {text => setPassword(text)} style = {input_styles.password} placeholder='                     Jelszó'/> 

          <View style = {input_styles.button} >
            <Button title = 'Bejelentkezés' color= "#392580" onPress={async () =>{
                      const can_login = await button_function(om_id,password);
                      if (!can_login) return;
                      else {
                        props.onLogin({can_login, om_id})
                        
                      }
                      
              }}/>
          </View>
        </View>



        <View style = {input_styles.register}>
          <Pressable onPress={() => setRegister(true)}><Text >Nincs még Fiókod?</Text></Pressable>
        </View>

        {register && 
        
          <Animated.View style = {{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            transform: [{translateY:translation}]
            
          }}>
            
              <TouchableWithoutFeedback onPress={()=>setRegister(false)}><Image source = {require("../../assets/exit_button.png")} style = {{position:'absolute',top:"25%",right:"20%", width: 25, height: 25, zIndex:2}}></Image></TouchableWithoutFeedback>
              <Register_Page/>
            
          </Animated.View>
        
        
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
      top: "5%",

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
      position: 'absolute',
      top: "35%"
    }
  }
)
const input_styles = StyleSheet.create(
  {
    padding: {
      position: 'absolute',
      top: "50%",
      width: "60%",
      height: "30%",
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
      

      marginLeft: 1,
      marginTop: 25,
      height: 40,
      width: 190,
      backgroundColor: "#8B8B8B",
      borderRadius: 10
    },
    password: {
      fontFamily:'BubblerOne_400Regular',
      
      marginLeft: 1,
      marginTop: 20,
      height: 40,
      width: 190,

      backgroundColor: "#8B8B8B",
      borderRadius: 10
    },
    button: {
      marginTop: 30,
      
      borderRadius: 20
      
    },
    register:
    {
      position:"absolute",
      color:'#000',
      bottom: "15%"
    }
    
  }
)