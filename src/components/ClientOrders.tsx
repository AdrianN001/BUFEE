import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { get_data, Order_Model } from "../funcs/firestore";
import { listOrders, list_client_orders } from "../funcs/order";
import ClientOrder from "./Client_Order";


export default function ClientOrders(props:any)
{
    const OMID:string = props.omid.toString()

    const [orders, setOrders] = useState<Order_Model[]>();


    let [loaded] = useFonts(
        {
            'Glory' : require("../../assets/fonts/Glory.ttf"),
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
            'Cavaet': require("../../assets/fonts/Caveat.ttf"),
        }
    )

    //resolving a Promise in a Functional Component
    useEffect(() =>{

        (async () => {setOrders(await list_client_orders(OMID))})()

    },[])


    return (
        <View style = {style.container}>
             <Text style = {style.title}>RENDELÉSEK</Text>
             <View style = {{height:"70%", width:"100%",top:"20%"}}>

             
                <ScrollView >

                    {orders?.map((elem, index) => {
                        return <ClientOrder key = {index}
                                            items = {elem.payload}
                                            order_id = {elem._id}
                                            price = {elem.price}
                                            isDone = {elem.isDone}
                                            isDeleted = {elem.isDeleted}
                                            isPayed = {elem.isPayed}
                                            refresh = {async () => setOrders(await listOrders())}/>
                    })}
                </ScrollView>
             </View>

             <TouchableOpacity onPress={props.setButton} style = {style.back}><Image source={ require("../../assets/back_button.png")}/></TouchableOpacity>
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
            fontSize:45,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
        },
        back: {
            position:'absolute',
            bottom:".5%",
            alignSelf:'center'
        },data:
        {
            position:'absolute',
            alignSelf:'center',
            justifyContent:'center'
        }
    }
)