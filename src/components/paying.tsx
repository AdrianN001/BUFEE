import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Food, { FoodInterface } from './food';
import React from 'react';



export default function Paying(props: any)
{
    let bucket: object[] = props.bucket




    return (
        <View style = {style.container}>
            <Text style = {style.title}>KOSÁR</Text>

            <View style = {style.list}>
                {
                    bucket.map((value, index) => 
                    {
                        const {nev, price} = (value as FoodInterface)
                        
                        return <Food key = {index} image ={require("../../assets/icon.png")} nev = {nev} price = {`${price} Ft`} delete = {true} button_function = {()=>
                        {
                            
                            bucket.slice(index, 1);
                            props.updateBucket(bucket)
                            
                        }}/>
                    })
                }
            </View>


            <TouchableOpacity style = {style.paywithcash}>
                <Image source={require("../../assets/paywithcash.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style = {style.paywithcard}>
                <Image source={require("../../assets/paywithcard.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.back_button} style = {style.back}>
                <Image source={require("../../assets/backsmall.png")}/>
            </TouchableOpacity>
        </View>
    )



}

const style = StyleSheet.create(
    {
        container:
        {
            position:'absolute',
            alignSelf:"center",


            backgroundColor: "#232323",
            width: "98%",
            height:"98%",
            borderRadius:20
        },
        title:{
            position:'absolute',
            top:"5%",
            alignSelf:'center',
            fontSize:60,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
        },
        list:{

        },
        back:{
            position:'absolute',
            alignSelf:'center',
            bottom:"5%"
        },
        paywithcash:
        {
            position:'absolute',
            alignSelf:'center',
            bottom:"26%"
        },
        paywithcard:
        {
            position:'absolute',
            alignSelf:'center',
            bottom:"15%"
        }
    }
)