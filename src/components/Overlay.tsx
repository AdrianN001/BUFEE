import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Animated, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useFonts } from '@expo-google-fonts/dev';
import React, { useEffect, useRef } from 'react';



function Overlay(props: any)
{
    const {isClerk} = props
    //const blink_animation = useRef(new Animated.Value(1)).current;

    // useEffect(() => {
    //     Animated.loop(
    //         Animated.sequence([
    //             Animated.timing(
    //                 blink_animation,
    //                 {
    //                     toValue: 0,
    //                     duration: 300,
    //                     useNativeDriver: true
    //                 }
    //             ),Animated.timing(
    //                 blink_animation,
    //                 {
    //                     toValue: 1,
    //                     duration: 400,
    //                     useNativeDriver: true
    //                 }
    //             )
    //         ]
    //         )
    //     ).start()

    // },[])

    

    let [loaded] = useFonts(
        {
            'Glory' : require("../../assets/fonts/Glory.ttf"),
            'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf"),
            'Cavaet': require("../../assets/fonts/Caveat.ttf"),
        }
    )

 

    return (
        <View>
            <TouchableHighlight onPressIn={props.button_1_function}>
                <Image source = {!isClerk ? require("../../assets/history_button.png") : require("../../assets/refresh_button.png")} style = {style.history}/>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={props.button_3_function }>
                <Text style = {{...style.text, backgroundColor:"rgba(0,0,0,0)"}} >
                    BUFEE
                    
               </Text>
            </TouchableHighlight>
            
            <TouchableHighlight onPressIn={props.button_2_function}>
                
                    <Image source = {!isClerk ? require("../../assets/profile_button.png") : require("../../assets/clerk_exit.png")} style = {style.profile}/>

                
            </TouchableHighlight>
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
            alignSelf:'center',
            justifyContent:'center',
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