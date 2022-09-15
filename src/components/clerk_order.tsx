import React, { useEffect, useReducer, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {get_data, Order_Model} from "../funcs/firestore";
import { listOrders } from "../funcs/order";
import Order_Panel from "./order_panel";
import Overlay from "./Overlay";

import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


function ClerkOrder(props:any)
{
    const [orders, setOrder] = useState<Order_Model[]>();
    
    const rendeles_menny = useRef<number>(0);

    useEffect(
        () =>{
           (async () => {
            setOrder(await listOrders());
            
           })();
            
        },[])
    
    console.log("Rendelesek panell frisstive")

    return (<View style = {style.container}>
    <View style = {style.scrview}>
        <ScrollView >
            { //      ne irjon ki olyant ami kesz van vagy torolve lesz
                orders?.filter(elem => !elem.isDeleted && !elem.isDone).map((elem : Order_Model, index: number) => {
                    rendeles_menny.current++;

                    const [ora, perc, ] = elem.timeCreated.split(":")
                    return <Order_Panel order_id = {elem._id}
                                        nev = {elem.name}
                                        class_ = {elem._class}
                                        items = {elem.payload}
                                        price = {elem.price}
                                        key = {index}
                                        style = {style.item}
                                        delete_button = {async () => {
                                            const doc = await firestore().collection("queue").where("order_id", "==", elem._id).get()
                                            await doc.docs[0].ref.update({isDeleted: true});
                                            rendeles_menny.current--;
                                            setOrder(await listOrders())
                                        }}
                                        ready_button = {async () =>
                                        {
                                            const doc = await firestore().collection("queue").where("order_id", "==", elem._id).get()
                                            await doc.docs[0].ref.update({isDone: true});
                                            rendeles_menny.current--;
                                            setOrder(await listOrders())
                                        }}
                                        />
                } )
            }
            {
                rendeles_menny.current === 0 && <Text style = {{marginTop:"50%", fontSize:25, alignSelf:'center',justifyContent:"center"}}> Jelenleg nincsenek rendelések </Text>
            }
        </ScrollView>
    </View>
    <View style = {style.overlay}>

        <Overlay 
        isClerk = {true}
        button_1_function = {async () => setOrder(await listOrders())}
        button_2_function = {props.button_function}/>
    </View>
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
            height: "100%", 
            marginTop:"10%",
            
        },
        item:
        {

            alignSelf:'center',

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
        },overlay:
        {
            position:'absolute',
            bottom:10,
    
    
            backgroundColor: "#222222",
            borderRadius: 30,
            height:100,
            width: "98%",
            alignSelf:'center'
        }
    }
)

export default ClerkOrder