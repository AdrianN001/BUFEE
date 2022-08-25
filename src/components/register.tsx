import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button, KeyboardAvoidingView, Pressable, Animated, TouchableWithoutFeedback} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';
import { User_Data } from '../classes/user';
import { add_User } from '../funcs/firestore';
import React from 'react';



function Register_Page()
{
    let [om_id, setOMID] = useState("")
    let [password, setPassword] = useState("")

    let [name, setName] = useState("")
    let [class_, setClass_] = useState("")

    return (<>
            <View style = {input_styles.padding} >
                
                <TextInput value = {om_id} onChangeText= {text => setOMID(text)} style = {{...input_styles.om_id, marginTop:35}} placeholder = "                OM Azonositó"/>

                <TextInput  value = {password} onChangeText= {text => setPassword(text)} style = {input_styles.password} placeholder='                     Jelszó'/> 

                <TextInput value = {name} onChangeText= {text => setName(text)} style = {{...input_styles.om_id, marginTop: 50}} placeholder = "                Teljes Neved"/>

                <TextInput  value = {class_} onChangeText= {text => setClass_(text)} style = {input_styles.password} placeholder='                     Osztály'/> 

                <View style = {input_styles.button} >
                <Button title = 'Regisztráció' color= "#554A47" onPress={() => add_User(om_id,password,name,class_)}/>
                </View>
            </View>
            
            </>)
}




  const input_styles = StyleSheet.create(
    {
      padding: {
        position: 'absolute',
        top: "25%",
        width: "60%",
        height: "50%",
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
export default Register_Page