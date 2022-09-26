import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {li_with_amount} from "../funcs/utility"
import { listOrders } from "../funcs/order";
import { useFonts } from "@expo-google-fonts/dev";


function Order_Panel(props:any)
{
    const [loaded] = useFonts(
        {
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
        }
    )

    const {nev, order_id, class_, items, price, timeAdded} = props;

    return (<View style = {style.container}>

        <View style = {{height:"50%",}}>
            {
                li_with_amount(items).map((item:string, index: number) => 
                {
                    return (<Text key = {index}
                                  style = {{...style.list,position:'absolute',top:`${10 + index * 20}%`}}>{`- ${item}`} </Text>)
                })
            }
        </View>

        <Text style = {style.index}>{`#${order_id}`}</Text>

        <TouchableOpacity style ={{position:'absolute', top:"69.6%"}} onPress = {props.delete_button}>
            <Image source = {require("../../assets/clerk_cancel_order.png")} style = {{width:90,height:90}}/>
        </TouchableOpacity>

        <TouchableOpacity style ={{position:'absolute', top:"70%", left: "25%"}} onPress = {props.ready_button}>
            <Image source = {require("../../assets/clerk_set_order_ready.png")} style = {{height:90, width:270}}/>
        </TouchableOpacity>
        
    </View>)
}


const style = StyleSheet.create(
    {
        container:{
            height: 360,
            width: "100%",
            backgroundColor: "#222222",
            borderRadius:12,
            marginBottom:"6%",
        },list:
        {
            textAlign:'center', 
            fontSize:13,
            alignSelf:"flex-start",
            marginTop:20,
            marginLeft:30,
            color:"white",
            fontFamily:"JetBrains-Mono"
        },
        price: {
            position:'absolute',
            top:"81%",
            alignSelf:'center',
            textAlign:'center',
            fontSize:23,
            
        },
        name: {
            position:"absolute",
            top:"1%",
            fontSize:18
        },
        class: {
            position:'absolute',
            top: "1%",
            right:"5%",
            fontSize:20
        },
        time:{
            position:'absolute', 
            alignSelf:'center',
            fontSize:20
        },
        ready:
        {
            width:"25%",
            marginTop:"35%", 
            marginLeft:"5%",
        },
        delete:
        {
            alignSelf:'flex-end',
            top:"-100%"
        },
        index:{
            alignSelf:"center",
            fontSize:40,
            color:"#E17676",
        }
    }
)


export default Order_Panel