import React, { useEffect, useReducer, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import { useState } from 'react';
import { Order_Model } from "../funcs/firestore";
import Finished_Order from "./clerk_done_panel";
import { listOrders, list_finished_orders } from "../funcs/order";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";



function Finished_Orders(props:any)
{
    const kesz_Rendelesek = useRef<number>(0);

    const [orders, setOrder] = useState<Order_Model[]>();
    const [filter, setFilter] = useState<string>("");

    useEffect(() =>
    {
        ( async () => { 
            const data = await list_finished_orders()
            console.log(data.length)
            setOrder(data)} ) ()
    }, [])


    return (<View style = {style.container}>
        <View style = {style.search}>
            <TextInput value={filter ?? "   Keresés"} placeholder = "ID" keyboardType = "numeric" style = {style.search_field} onChangeText = {text => setFilter(text)} />
            <TouchableOpacity onPress = {() => {setFilter("")}} style = {{width:80, left:"60%",bottom: "10%",height:80}}>
                <Image source = {require("../../assets/exit_button.png")} style = {{height:"100%",width:"100%"}}/>

            </TouchableOpacity>
        </View>
        <View style = {style.scrview}>
            <ScrollView>
            
                {
                    orders?.map((elem : Order_Model, index: number) => {
                        kesz_Rendelesek.current++
                        
                        if (new RegExp(filter).test(elem._id.toString()))
                        {

                        
                            return (<Finished_Order key = {index}
                                                    
                                                    order_id = {elem._id}
                                                    price = {elem.price}
                                                    details = {() => Alert.alert("A Rendelés Részletei", `${elem.isPayed ? 'Kártyás fizetés volt' : "Nem lett még kifezetve"}\n Rendelés időpontja: ${elem.timeCreated}\n Rendelő neve: ${elem.name}\n Rendelő osztálya: ${elem._class}`)}
                                                    paymentDone = {async () => {
                                                        Alert.alert(
                                                            "Biztosan át lett véve a rendelés ?",
                                                            "Amennyiben igen, úgy a rendelés törlésre kerül",
                                                            [
                                                                {
                                                                    text:"Mégsem",
                                                                    onPress: () => console.log("Visszavonva"),
                                                                    style:"cancel"
                                                                },
                                                                {
                                                                    text:"Igen",
                                                                    onPress: async () => {
                                                                        try{

                                                                            (await firestore().collection("finished_orders").where("order_id", "==", elem._id).get()).docs[0].ref.delete()
                                                                        }catch(err)
                                                                        {
                                                                            console.log(err)
                                                                        }
                                                                        setOrder(await list_finished_orders())
                                                                    } 
                                                                }
                                                            ]
                                                            
                                                         )

                                                    }}
                                                    /> )                
                        }
                    })
                }

            </ScrollView>
        </View>
        

        <TouchableOpacity onPress = { props.back_button } style = {style.backbutton}>
            <Image source = {require("../../assets/back_button.png")}/>
        </TouchableOpacity>

    </View>)
}

const style = StyleSheet.create(
    {
        container: {
            height: "100%",
            width:"100%",
            backgroundColor: "#262626"
        },
        search:
        {
            height:"21%",
            
        },
        search_field:{
            top:"40%",
            height:"50%",
            left:"20%",
            width:"30%",
            backgroundColor:"#E17676",
            borderRadius:20,
            borderColor:"rgba(0,0,0,0.2)",
            borderWidth:5,
            textAlign:"center",
            fontSize:30,
            color:"white",
            fontFamily:"JetBrains-Mono"
        },
        backbutton: {
            position:'absolute',
            alignSelf:"center",
            bottom:".3%"
        },
        scrview:{
            height:"70%",
            borderRadius:15,
            widht:"100%",
            backgroundColor:"#1C1B1B"
        }
    }
)

export default Finished_Orders