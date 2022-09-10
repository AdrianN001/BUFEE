import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable} from 'react-native';
import { useState } from 'react';
import {get_data, Order_Model} from "../funcs/firestore";
import { listOrders } from "../funcs/order";


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
    
    

    </View>)
}

const style = StyleSheet.create(
    {
        container:
        {
            height:"100%",
            width:"98%",
            borderRadius:20
        }
    }
)

export default ClerkOrder