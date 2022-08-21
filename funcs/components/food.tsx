import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { 
  Bangers_400Regular 
} from '@expo-google-fonts/bangers'
import { 
  BubblerOne_400Regular 
} from '@expo-google-fonts/bubbler-one'



function Food(props: any){
    const {image, name, price, id, callback} = props
    
    let [fontsLoad] = useFonts(
        {
          Bangers_400Regular,
          BubblerOne_400Regular
        }
      )

    

    return (
        <View >
                <Image source = {image} style = {style.image}/>

                <View>
                    
                    <Text style= {style.price}>
                       {price}
                    </Text>
                </View>
            
        </View>
    )
}


const style = StyleSheet.create(
    {
        image:
        {
            position: 'absolute',
            top: 0,
            left : 0,
            height: "20%",
            width: "20%"
        },
        name: {
            position:"absolute",
            top:0,
            textAlign: "center",
            fontFamily: "Bangers_400Regular",
            color: "#FFFFFF",
            fontSize: 20
        },
        price: {
            position:"absolute",
            bottom:0,
            textAlign: "center",
            color: "#E17676",
            fontFamily: "Bangers_400Regular",
            fontSize: 30
        }
    }
)



export default Food
