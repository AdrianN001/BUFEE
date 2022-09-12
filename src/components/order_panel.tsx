import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {li_with_amount} from "../funcs/utility"


function Order_Panel(props:any)
{
    const {nev, class_, items, price, timeAdded} = props;

    return (<View style = {style.container}>
        <Text style = {style.name}>{nev}</Text>
        
        <Text style = {style.class}>{class_}</Text>

        {
            li_with_amount(items.slice(0,items.length-1)).map((item: string, index: number) => 
            {
                return <Text key = {index} style = {{...style.list,position:'absolute', top:`${14 + index * 20}%`}}> {item}</Text>
            })
        }

        <Text style = {style.price}>{`${price} Ft.`}</Text>
        <Text style = {style.time}>{timeAdded}</Text>

        <TouchableOpacity style =  {style.ready}>
            
            <View >
                <Text style = {{color:"#38b811", fontSize:30}}>{" KÉSZ"}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style = {style.delete}>
                <Text  style = {{color:"red", fontSize:25}}>{"RENDELÉS \nTÖRLÉSE"}</Text>
            </View>
            
        </TouchableOpacity>
    </View>)
}


const style = StyleSheet.create(
    {
        container:{
            height: 200,
            width: "100%",
            backgroundColor: "#534F4F",
            borderRadius:12,
            marginBottom:"6%",
        },list:
        {
            textAlign:'center', 
            alignSelf:'center',
            color:"white"
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
        }
    }
)


export default Order_Panel