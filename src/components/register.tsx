import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert, AsyncStorage,SafeAreaView, TextInput,  Button, KeyboardAvoidingView, Pressable, Animated, TouchableWithoutFeedback, AlertStatic} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';
import { User_Data } from '../classes/user';
import { add_User, REGISTER_RESPONSE } from '../funcs/firestore';
import React from 'react';



async function register(om_id: string,password: string,name: string,class_: string)
{
    const reponse = await add_User(om_id, password,name, class_)
    
    

    switch (reponse)
    {
      case REGISTER_RESPONSE.ALREADY_REGISTERED:
          Alert.alert("HIBA", "Ezzel a Felhasználó Névvel már regisztráltak", [{text:"OK"}])
          break
      case REGISTER_RESPONSE.INVALID_CLASS:
          Alert.alert("HIBA", "Hibás osztály formátum: \n Probáld meg így: '11. E' vagy '11.E' ")
          break
      case REGISTER_RESPONSE.OK:
          Alert.alert("Sikeres Regisztráció", "Üdvözöllek a BUFEE appban")
          break
    }

}


function Register_Page(props:any)
{
    let [om_id, setOMID] = useState("")
    let [password, setPassword] = useState("")
    let [password_2, setPassword_2] = useState("") 

    let [name, setName] = useState("")
    let [class_, setClass_] = useState("")

    return (
            <View style = {input_styles.padding} >
                
                <TextInput value = {om_id} onChangeText= {text => setOMID(text)} style = {{...input_styles.om_id, marginTop:35}} placeholder = "Felhasználó Név"/>

                <TextInput  value = {password} onChangeText= {text => setPassword(text)} style = {input_styles.password} placeholder='Jelszó'/> 
                <TextInput  value = {password_2} onChangeText= {text => setPassword_2(text)} style = {input_styles.password} placeholder='Jelszó újra'/> 

                <TextInput value = {name} onChangeText= {text => setName(text)} style = {{...input_styles.om_id, marginTop: 50}} placeholder = "Teljes Neved"/>

                <TextInput  value = {class_} onChangeText= {text => setClass_(text)} style = {input_styles.password} placeholder='Osztály'/> 

                <View style = {input_styles.button} >
                  <Button title = 'Regisztráció' color= "#554A47" onPress={async () => {
                      if (await AsyncStorage.getItem("registered_user") !== null)
                      {
                        return Alert.alert("HIBA", "Erről a készülékről már regisztráltak egyszer.")
                      }

                      if (password !== password_2) { 
                        return Alert.alert("HIBA", "A két jelszó nem egyezik meg")
                      }
                      register(om_id,password,name,class_)

                      props.button_function()
                      await AsyncStorage.setItem("registered_user", om_id)
                      }}/>
                </View>
            </View>
            
            )
}




  const input_styles = StyleSheet.create(
    {
      padding: {
        height: "100%",
        width: "100%",
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
        textAlign:"center"
      },
      om_id:{
       
        fontFamily:'BubblerOne_400Regular',
        
  
        marginLeft: 1,
        marginTop: "20%",
        height: 40,
        width: 190,
        backgroundColor: "#8B8B8B",
        borderRadius: 10,
        textAlign:"center"
      },
      password: {
        fontFamily:'BubblerOne_400Regular',
        
        marginLeft: 1,
        marginTop: 20,
        height: 40,
        width: 190,
  
        backgroundColor: "#8B8B8B",
        borderRadius: 10,
        textAlign:"center"
      },
      button: {
        marginTop:30,
        
        borderRadius: 20,
        textAlign:"center"
        
      },
      register:
      {
        position:"absolute",
        color:'#000',
        bottom: "15%"
      }
      
    }
  )
export default Register_Page