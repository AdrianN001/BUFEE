import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Animated, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import { useFonts } from '@expo-google-fonts/dev';
import React, { useEffect, useRef } from 'react';
import { li_with_amount } from '../funcs/utility';

import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";



function ClientOrder(props:any) : JSX.Element
{
    const {items, order_id, price, isDeleted,isPayed,isDone} = props;

    let image_used; 
    let state: string; 

    let button_function ;

    if (isDeleted && !isDone)
    {
        image_used = require("../../assets/state_refuse.png")
        state = "deleted"

        button_function = () => {Alert.alert("Törlés", "A Rendelésed elutasitásra került. \n Szeretnéd a rendelésed végleg törölni?", [{
            text:"Mégse",
            onPress: () => console.log("ASD"),
            style: "cancel"
        },
        {
            text:"TÖRLÉS",
            onPress: async () => {
                try{
                    (await firestore().collection("deleted_orders").where("order_id", "==", order_id).get()).docs[0].ref.delete()

                }catch(err)
                {
                    console.log(err)
                }
                props.refresh()
            }
        }])}
    }else if (isDone && !isDeleted){
        image_used = require("../../assets/state_done.png")
        state = "done"
    }else{
        image_used = require("../../assets/state_working.png")
        state = "working"
    }

    useFonts(
        {
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
        }
    )


    return (<View style = {style.container}>
        <View style = {style.payload}>
            {li_with_amount(items).map((elem: string,index: number ) =>
            {
                
                return <Text key = {index} style = {{...style.list, position:'absolute', left:"2%", top:`${10 + index * 20}%`}}>{`- ${elem.replace("\n","")}`}</Text>
                
            } )}
        </View>
        <View style = {style.order_id_box}>
            <Text style = {style.id}>{`#${order_id}`}</Text>
        </View>

        <View style = {style.price_box}>
            <Text style = {style.price}>{!isPayed ? `${price} Ft.` : `Kifizetve`}</Text>
        </View>

        {state === "working" ? <View style = {style.image}>
                                    <Image source = {image_used} style = {{width:"90%",left:"5%"}}></Image>
                                </View>

                             :  <TouchableOpacity style = {style.image} onPress = {button_function}>
                                    <Image source = {image_used} style = {{width:"90%",left:"5%"}}></Image>
                                </TouchableOpacity>}
        

    </View>)
}


const style = StyleSheet.create({
    container:{
        width:"100%",
        height:330,
        marginTop:10,
        borderRadius:20,
        backgroundColor:"#3C3737"
    },
    payload:{
        width:"100%",
        height:"45%",
        marginTop:"5%",
    },
    list:{
        fontFamily:'JetBrains-Mono',
        fontSize:12,
        color:"white"
    },
    order_id_box:{
        position:"absolute",
        top:"50%",
        left:"2%",
        backgroundColor:"#D9D9D9",
        borderRadius:18,
        width:"40%",
        height:"20%",
    },
    id:{
        alignSelf:"center",
        textAlign:"center",
        top:"-7%",
        fontSize:45,
        fontFamily:"JetBrains-Mono",
        color:"#E17676"
    },
    price_box:
    {
        position:"absolute",
        top:"50%",
        right:"2%",
        backgroundColor:"#E17676",
        borderRadius:18,
        width:"52%",
        height:"20%",
    },
    price:{
        alignSelf:"center",
        textAlign:'center',
        fontSize:30,
        top:"15%",
        fontFamily:"JetBrains-Mono",
        color:"#D9D9D9"
    },
    image:{
        position:'absolute',
        bottom:"5%",
        width:"100%",
        alignSelf:"center",
        
    }
})

export default ClientOrder