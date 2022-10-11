import React from "react";

import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert} from 'react-native';
import { useState } from "react";
import { useFonts } from "@expo-google-fonts/dev";


export default function SearchEngine(props:any)
{
    const [search, setSearch] = useState<string>("");

    useFonts({
        'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
    })


    return (
        <View style = {style.border}><TextInput value = {search } style = {style.searchbar} onChangeText = {(text: string) => {
            if (text !== "\\" && text !== "*")
            {

                setSearch(text)
                props.updateSearch(text)
            }
        }}/>
        <Image style = {style.image} source = {require("../../assets/search_vector.png")} />
        </View>
        
    )
}

const style = StyleSheet.create(
    {  
        border:{
        borderColor:"#ddd",
        borderWidth:5,
        borderRadius:5,
        width:"100%",
        height:"100%"
    },
        searchbar:
        {
            backgroundColor:"#e8a5a5",
            color: "#fff",
            fontSize:20,
            height:"100%",
            width:"100%",
            borderColor:"#ddd",
            textAlign:"center",
            fontFamily:"JetBrains-Mono"
            
            
        },
        image:{
            width:30,
            height:30,
            top:"-80%",
            left:"2%"
        }
    }
    
)