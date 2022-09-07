import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableOpacity, TouchableHighlight} from 'react-native';
import { get_data, get_password } from "../funcs/firestore";


export default function Profile(props:any)
{
    const OMID:string = props.omid

    const [data, setData] = useState< FirebaseFirestoreTypes.DocumentData >()


    let [loaded] = useFonts(
        {
            'Glory' : require("../../assets/fonts/Glory.ttf"),
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
            'Cavaet': require("../../assets/fonts/Caveat.ttf"),
        }
    )

    

    //resolving a Promise in a Functional Component
    useEffect(() =>{
        get_data(OMID.toString()).then(
            data => {console.log(data); setData(data)}
        )
    },[])

    return (
        <View style={style.container}>
            <Text style = {style.title}>PROFIL</Text>

            <Text style = {{...style.data, position:'absolute', top:"25%",alignSelf:'center'}}>Név</Text>
            <Text style = {{...style.data, position:'absolute', top:"35%",alignSelf:'center'}}>{data?.name ?? "..."}</Text>

            <Text style = {{...style.data, position:'absolute', top:"55%",alignSelf:'center'}}>Osztály</Text>
            <Text style = {{...style.data, position:'absolute', top:"65%",alignSelf:'center'}}>{data?.class_ ?? "..."}</Text>

            <TouchableOpacity onPress={props.setButton} style = {style.back}><Image source={ require("../../assets/back_button.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={props.setLogout} style = {style.logout}><Image source={ require("../../assets/logout_button.png")}/></TouchableOpacity>
        </View>
    )



}

const style = StyleSheet.create(
    {
        container: {
            position:'absolute',
            alignSelf:"center",


            backgroundColor: "#232323",
            width: "98%",
            height:"98%",
            borderRadius:40
        },
        title: {
            position:'absolute',
            top:"5%",
            alignSelf:'center',
            fontSize:60,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
        },
        back: {
            position:'absolute',
            bottom:"8%",
            alignSelf:'center'
        },
        logout:
        {
            position:'absolute',
            bottom:'-1%',
            alignSelf:'center'
        },
        data:
        {
            color: "#FFF",
          fontSize:32,
          fontFamily: "JetBrains-Mono",


          shadowColor: "#FFF",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }
        
    }
)