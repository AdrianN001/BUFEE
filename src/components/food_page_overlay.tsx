import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView} from 'react-native';
import { useFonts } from '@expo-google-fonts/dev';
import React from 'react';



function Overlay(props: any)
{

    let [loaded] = useFonts(
        {
            'Glory' : require("../../assets/fonts/Glory.ttf"),
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
            'Cavaet': require("../../assets/fonts/Caveat.ttf"),
        }
    )

 

    return (
        <View>
            <Pressable><Image source = {require("../../assets/history_button.png")} style = {style.history}></Image></Pressable>
            <Pressable onPress={props.activateSearch}><Text style = {style.text}>BUFEE</Text></Pressable>
            <Pressable><Image source = {require("../../assets/profile_button.png")} style = {style.profile}></Image></Pressable>
        </View>
    )
}



const style = StyleSheet.create(
    {
        overlay: 
        {
            backgroundColor: "#262626",
            borderRadius: 30,
            height:100,
            width: "100%"
        }, 
        history:
        {
            height: 70,
            width: 70,
            position: 'absolute',
            top:15,
            left:10
        },
        profile:
        {
            height: 70,
            width: 70,
            position: 'absolute',
            top:15,
            right:10
        },
        text:
        {
            position: 'absolute',
            marginTop : 20,
            top: "100%",
            right: "35%",
            fontSize:40,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
            
        }
    }
)


/*
fontSize:40,
            fontFamily:'Caveat',
            fontStyle:'italic',
            textShadowColor: 'rgba(252, 36, 3, 0.5)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
*/
export default Overlay