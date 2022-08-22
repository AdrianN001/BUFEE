import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Food from './food';


function Food_page()
{


    return(
        <ScrollView style= {{backgroundColor: "#262626"}}>
                <View style = {style.container}>
                    
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} name = "Sajtos  Csiga" price = "5000 Ft"/>
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                        <Food style = {style.food} image = {require("../../assets/icon.png")} />
                    
                    
                </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: "10%",
        backgroundColor: "#262626",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    list :{
        
        marginTop:"10%",
        alignItems:'center',
        height: "100%"
    },
    food: {
        
        width: "20%"
    }
})


export default Food_page