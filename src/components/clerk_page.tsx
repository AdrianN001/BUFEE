import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Animated, TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from '@expo-google-fonts/dev';
import React, { useEffect, useRef, useState } from 'react';
import ClerkOrder from './clerk_order';
import { StatusBar } from 'expo-status-bar';
import Finished_Orders from './clerk_finished_orders';


export default function Clerk(props: any)
{
    const [order_open, setOpen] = useState<boolean>(false);
    const [finishedO, setFinished] = useState<boolean>(false);

    useFonts(
        {
          'Glory': require("../../assets/fonts/Glory.ttf")
        }
      )

    return (
        <View style = {style.container}>
            { !order_open ? <>
                                <Image source = {require("../../assets/bufee_logo.png")} style = {style.image}/>
                                <Text style = {style.text}>BUFEE</Text>

                                <View  style = {style.order} >
                                    <TouchableOpacity onPress={()=>{setOpen(true)}}><Image source = {require("../../assets/rendeles_clerk.png")}/></TouchableOpacity>
                                </View>
                                

                                <View style = {style.message} >
                                    <TouchableOpacity onPress={() => Alert.alert("EZ A FUNKCIÓ MÉG FEJLESZTÉS ALATT ÁLL.", "Késöbbi verziókban elérhetővé fog válni.")}><Image source = {require("../../assets/message_clerk.png")} /></TouchableOpacity>
                                </View>

                                <View style = {style.finished} >
                                    <TouchableOpacity onPress={()=> {setFinished(true)}}><Image source = {require("../../assets/finished_orders.png")} /></TouchableOpacity>
                                </View>
                            </>
                            :<ClerkOrder button_function = {() => setOpen(false)}/>
                }
            {
                finishedO && <Finished_Orders back_button = {() => setFinished(false)}/>
            }

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
           bottom:'50%',
           alignSelf:'center',
        },
        message:{
            position:'absolute',
            bottom:"30%",
            alignSelf:'center',
        },
        finished:{
            position:'absolute',
            bottom:"10%",
            alignSelf:'center',
        }
    }
)