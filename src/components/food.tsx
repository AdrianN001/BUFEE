import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable} from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Glory_100Thin } from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';


interface FoodInterface{
    image:number // require(image) -->
    name: string
    price: string //lehetne int is 
    id: number
    callback?: () => void
}


function Food(props: any): JSX.Element{  //props-nak nem lehet Interface-t megadni, mivel a babel nem kedvelne i guess
    const {image, name, price, id, callback} = props
   
    const [loaded] = useFonts({
        'Glory' : require("../../assets/fonts/Glory.ttf")
        })
    if (!loaded)
    {
        
        return <AppLoading/>
          
    }

    return (<View style = {style.container}>
                <View style = {{width:90}}><Image source = {image ?? require("../../assets/icon.png")} style = {style.image} /></View>
                
                <View style = {style.text_container}>

                
                    <Text style = {style.name}>{name ?? "%Name%"}</Text>


                    <Text style = {style.price}>{price ?? "%Price%"}</Text>


                </View>
                <Pressable><View><Image style = {style.tocart} source ={ require("../../assets/to-cart.png")}/></View></Pressable>
            </View>)
}

const style = StyleSheet.create(
    {
        container: {
            marginTop:"5%",
            marginRight: "5%",
            marginBottom: 0,
            backgroundColor:"#343333",
            
            flex: 1, flexDirection: "row", justifyContent:"space-between", width: "97%",
            borderRadius: 7,

            //box shadowing
            //https://ethercreative.github.io/react-native-shadow-generator/

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        },
        image:{
            marginTop: "10%",
            marginLeft:"8%",
            height:"85%",
            width:110,

        },
        text_container:
        {
            flex:5,
            
        },
        price: {
          
          textAlign:'center',
          marginTop: 10,
          
          color: "#E17676",
          fontSize:36,
          fontFamily: "Glory"
        
           
        },
        name:{
        
           color: "#EFEFEF",
           fontSize:21,
           textAlign:'center',
           marginBottom: 20
            
        },
        tocart:
        {
            position:'absolute',
            top:39,
            right: 10,
            height: 30,
            width: 30,


            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        }
    }
)


export default Food
