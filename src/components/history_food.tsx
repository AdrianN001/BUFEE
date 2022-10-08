import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Glory_100Thin } from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';
import React from 'react';

export default function HistoryFood(props:any)
{
    const {image, name, price, id} = props


    const [loaded] = useFonts({
        'Glory' : require("../../assets/fonts/Glory.ttf"),
        'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf")
        })
    if (!loaded)
    {
        
        return <AppLoading/>
          
    }


    return (
        <View style= {style.container}>
            
            <View style = {style.nameView}>
            <Text style = {style.name}>
                {name}
            </Text>
            </View>
            
            <Text style = {style.price}>
                {price}
            </Text>

            <TouchableOpacity onPress={props.button_function}><Image style = {style.tocart} source ={ require("../../assets/trash.png")}/></TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create(
    {
        container:
        {
            height:"30%",
            width:"100%",
            borderRadius:20,
            backgroundColor:"#282828",
            borderWidth:4,
            borderColor:'#000',
            marginBottom:"1%"
        },
        image:
        {
            marginTop: "10%",
            marginLeft:"8%",
            height:85,
            width:110,
            borderRadius:10
        },
        tocart:{
            position:'absolute',
            right:"3%",
            marginTop:"2%",
            
            
            height: 30,
            width: 30,
        },
        price:{
            position:'absolute',
            right:"18%",
            top:"10%",
            alignSelf:'center',
            textAlign:'center',
            color:"#E17676",
            fontFamily:"JetBrains-Mono",

            fontSize:25,


           
            borderRadius:10,
            borderColor:"red"
            
        },
        name:{
            
            
            fontFamily:"JetBrains-Mono",
            
            textAlignVertical:'center',
            justifyContent:'center',
            alignSelf:'center',
            textAlign:'center',
            color:"#000",
            
            fontWeight:'600',
            fontSize:13,
            
        },
        nameView:
        {
            justifyContent:'center',
            position:'absolute',
            width:"48%",
            height:"100%",
            backgroundColor:"#D9D9D9",
            borderRadius:15,
            
        }
    }
)