import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';

import { 
  Bangers_400Regular 
} from '@expo-google-fonts/bangers'
import { 
  BubblerOne_400Regular 
} from '@expo-google-fonts/bubbler-one'

import AppLoading from 'expo-app-loading';


export default function Login() {

  let [om_id, setOMID] = useState("")
  let [password, setPassword] = useState("")


  let [fontsLoad] = useFonts(
    {
      Bangers_400Regular,
      BubblerOne_400Regular
    }
  )

  if (!fontsLoad){
    return <AppLoading />;
  }


  return (
    <View style={styles.container}>
      

      
      <Image style = { bufee_logo_style.burger} source={require("../assets/bufee_logo.png")}/>

      <Text style = {bufee_logo_style.text}>BUFEE</Text>

      <View style = {input_styles.padding} >
        <TextInput value = {om_id} onChangeText= {text => setOMID(text)} style = {input_styles.om_id} placeholder = "                OM Azonositó"/>

        <TextInput  value = {password} onChangeText= {text => setPassword(text)} style = {input_styles.password} placeholder='                     Jelszó'/> 

        <View style = {input_styles.button} >
          <Button title = 'Bejelentkezés' color= "#392580" onPress={() => console.log(om_id, password)}/>
        </View>
      </View>


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
      fontFamily : "BubblerOne_400Regular",
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
    
  }
)