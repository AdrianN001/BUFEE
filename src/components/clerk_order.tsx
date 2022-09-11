import React, { useEffect, useReducer } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {get_data, Order_Model} from "../funcs/firestore";
import { listOrders } from "../funcs/order";
import Order_Panel from "./order_panel";
import { update } from "lodash";


function ClerkOrder(props:any)
{
    const [orders, setOrder] = useState<Order_Model[]>();
    

    useEffect(
        () =>{
           (async () => {
            setOrder(await listOrders());
            console.log(orders)
           })();
            
        },[]
    )

    return (<View style = {style.container}>
    <View style = {style.scrview}>
        <ScrollView >
            {
                orders?.map((elem : Order_Model, index: number) => {

                    return <Order_Panel  nev = {elem.name}
                                        class_ = {elem._class}
                                        items = {elem.payload}
                                        price = {elem.price}
                                        timeAdded = {elem.timeCreated}
                                        key = {index}
                                        style = {style.item}
                                        />
                } )
            }
        </ScrollView>
    </View>
    <TouchableOpacity style = { style.refresh } onPress = {async () => setOrder(await listOrders())} >

        <Image source={require("../../assets/reload.png")}/>

    </TouchableOpacity>


    <TouchableOpacity style = { style.exit } onPress={props.button_function}>

        <Image  source={require("../../assets/clerk_exit.png")}/>

    </TouchableOpacity>
    </View>)
}

const style = StyleSheet.create(
    {
        container:
        {
            height:"100%",
            width:"100%",
            borderRadius:20
        },
        scrview: 
        {
            height: "85%", 
            marginTop:"10%",
            
            
            
            
            
        },
        item:
        {

            alignSelf:'center',
            height:100,
            marginTop:"20%",
        },
        refresh:{
            position:'absolute',
            top: "92%",
            left: "5%"
        },
        exit:{
            position:'absolute',
            top: "92%",
            left:"60%"
        }
    }
)

export default ClerkOrder