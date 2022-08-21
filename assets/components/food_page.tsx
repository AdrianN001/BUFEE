import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Food from './food';


function Food_page()
{


    return(
        <View>
            <Food image='../imgs/kenyer.jpg' id={1} name='kenyer1' price='1000Ft' callback={()=>console.log("1")}></Food>
            <Food image='../imgs/kenyer.jpg' id={2} name='kenyer2' price='2000Ft' callback={()=>console.log("2")}></Food>
        </View>
    )
}



export default Food_page