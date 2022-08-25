import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button, KeyboardAvoidingView, Pressable, Animated, Touchable, TouchableWithoutFeedback, Alert} from 'react-native';


export default function CartButton(props: any)
{
    const count =  `  ${props.count}  `;

    return (
        <View>
            <Image source = {require("../../assets/Cart_Button.png")} style = {style.image}/>
            {props.count && <Text style = {style.text}>{count}</Text>}
        </View>
    )
}

const style = StyleSheet.create(
    {
        image: {
            width:60,
            height:60
        },
        text:
        {
            position:'absolute',
            top:"-18%",
            left:"40%",

            color:"#fff",
            fontSize: 17,
            backgroundColor: "#E17676",
            borderRadius:15
        }
    }
)