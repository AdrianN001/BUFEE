import React from "react";

import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert} from 'react-native';
import { useState } from "react";


export default function SearchEngine(props:any)
{
    const [search, setSearch] = useState<string>("");


    return (
        <View style = {style.border}><TextInput value = {search } style = {style.searchbar} onChangeText = {(text: string) => {
            setSearch(text)
            props.updateSearch(text)
        }}/></View>
        
    )
}

const style = StyleSheet.create(
    {   border:{
        backgroundColor:"#fff",
        alignItems:'center',
        height:'35%',
        borderRadius:15
    },
        searchbar:
        {
            backgroundColor:"#e8a5a5",
            width:"95%",
            color: "#fff",
            fontSize:20,
            borderColor:"#ddd",
            borderRadius:10,
            
            marginTop:8,
            height:"80%",
            textAlign:"left"
            
        }
    }
)