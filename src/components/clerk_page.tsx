import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Animated, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useFonts } from '@expo-google-fonts/dev';
import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function Clerk(props: any)
{
    useFonts(
        {
          'Glory': require("../../assets/fonts/Glory.ttf")
        }
      )

    return (
        <View style = {style.container}>
            <Image source = {require("../../assets/bufee_logo.png")} style = {style.image}/>
            <Text style = {style.text}>BUFEE</Text>

            <View  style = {style.order} >
                <TouchableOpacity><Image source = {require("../../assets/rendeles_clerk.png")}/></TouchableOpacity>
            </View>
            

            <View style = {style.message} >
                <TouchableOpacity><Image source = {require("../../assets/message_clerk.png")} /></TouchableOpacity>
            </View>
            

            <StatusBar style='auto'/>
        </View>
    )
}

const style = StyleSheet.create(
    {
        container:
        {
            width:"100%",
            height:"100%",
            backgroundColor:"#262626"
        },
        image:
        {
            width:150,
            height:150,
            position:'absolute',
            alignSelf:"center",
            top:"5%"
        },
        text:
        {
            fontFamily : "Glory",
            color: "#E17676",
            fontSize: 40, 
            position: 'absolute',
            top: "25%",
            alignSelf:'center',
        },
        order:
        {
           position:'absolute',
           bottom:'40%',
           alignSelf:'center',
        },
        message:{
            position:'absolute',
            bottom:"20%",
            alignSelf:'center',
        }
    }
)