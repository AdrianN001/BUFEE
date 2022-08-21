import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Food from './food';


function Food_page()
{


    return(
        <SafeAreaView style = {style.container}>
            <View>
                <Food image='assets/imgs/kenyer.jpg' id={1} name='kenyer1' price='1000Ft' callback={()=>console.log("1")}></Food>
            </View>
            <View>
                <Food image='assets/imgs/kenyer.jpg' id={2} name='kenyer2' price='2000Ft' callback={()=>console.log("2")}></Food>
            </View>
            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        
    }
})


export default Food_page