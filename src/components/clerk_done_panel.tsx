import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useState } from 'react';
import React from 'react';
import { useFonts } from '@expo-google-fonts/dev';


function Finished_Order(props:any) : JSX.Element
{
    const {order_id,  price, } = props;

    const [loaded] = useFonts(
        {
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
        }
    )


    return (<View style = {style.container}>
        <TouchableOpacity onLongPress={props.details} >
            <View style = {{width:"100%",height:"70%"}}>

                <Text style = {style.order_id}>{`#${order_id}`}</Text>
                <Text style = {style.price}>{`${price} Ft.`}</Text>
            </View>
            
            
            
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={props.paymentDone}>
            <Image source = {require("../../assets/atvetel_gomb.png")} style = {style.button}/>
        </TouchableWithoutFeedback>
    </View>)

}


const style = StyleSheet.create({
    container: {
        height:300,
        width:"100%",
        backgroundColor: "#222222",
        borderRadius:25,
        marginTop:10
    },
    order_id:{
            alignSelf:"center",
            position:'absolute',
            top:30,
            fontSize:60,
            color:"#E17676",
            fontFamily:"JetBrains-Mono"
    },
    price:{
        alignSelf:"center",
            position:'absolute',
            top:130,
            fontSize:40,
            color:"white",
            fontFamily:"JetBrains-Mono"
    },
    button:{
        alignSelf:"center",
        position:'absolute',
        bottom:20
    }
})

export default Finished_Order