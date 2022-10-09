import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, AsyncStorage} from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Glory_100Thin } from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';
import React from 'react';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler"


import { update_liked, get_liked } from '../funcs/firestore';


export interface FoodInterface{
    image:number // require(image) -->
    nev: string
    price: string //lehetne int is 
    id: number

    buy_id: number
    callback?: () => void
}

const add_item = async (key: number, om_id: string): Promise < void >  => {
    
    const current_favorites: number[] = await (await firestore().collection("users").where("om_id", "==",om_id).get()).docs[0].data()["favorites"];
    console.log("ASDSASDASD");

    (await firestore().collection("users").where("om_id", "==", om_id).get()).docs[0].ref.update({
        favorites: Array.from(new Set([...current_favorites,key]))
    })
}

const remove_item = async (key: number, om_id: string): Promise < void >  => {
    const current_favorites: number[] = await (await firestore().collection("users").where("om_id", "==",om_id).get()).docs[0].data()["favorites"];
    
    (await firestore().collection("users").where("om_id", "==", om_id).get()).docs[0].ref.update({
        favorites: Array.from(new Set(current_favorites.filter(elem => elem !== key)))
    })
}


function Food(props: any): JSX.Element{  //props-nak nem lehet Interface-t megadni, mivel a babel nem kedvelne i guess
    const {image, name, price, id, favorites} = props;

                                // props.isLiked.then((data: boolean) => setFav(data))
    const [isFav, setFav] = useState<boolean>( props.isLiked );

    //console.log(favorites.current)
    
    


    useFonts({
        'Glory' : require("../../assets/fonts/Glory.ttf"),
        'JetBrains-Mono': require("../../assets/fonts/JetBrainsMono.ttf")
        })
   

    return (
        <GestureHandlerRootView style = {{...style.container,flex:1}}>
            <Swipeable containerStyle = {{width:"100%",height:"100%"}} onSwipeableWillOpen = {(direction: string) =>{
        console.log("ASD")
    }} renderLeftActions  = {() => <Text>AD</Text>}>
                <View style = {{width:"100%", height:"100%"}} onLayout = {(evt:any) => {props.getHeight(evt.nativeEvent.layout.height)}}>
                            {false && <View style = {{width:90}}><Image source = {image ?? require("../../assets/icon.png")} style = {style.image} /></View>}
                            
                            <View style = {style.text_container}>

                            
                                <Text style = {{...style.name, fontSize:20}}>{name ?? "%Name%"}</Text>


                                <Text style = {style.price}>{price ?? "%Price%"}</Text>

                                 {/* <Pressable onPress={() => { props.hearth_function(isFav); 
                                                            console.log(isFav ? "Torolve" : "Hozzaadva")

                                                            !isFav  ? add_item(  Number(props.id), props.om_id  )
                                                                    : remove_item(  Number(props.id), props.om_id  )

                                                            setFav(!isFav);
                                                            }} style = {{width:50, position:'absolute', left:'4%', top:'40%'}}>
                                    <Image source = {isFav ? require("../../assets/red_heart.png") : require("../../assets/white_heart.png")} style = {style.heart}/>
                                </Pressable> */}
                               
                            </View>
                            
                            <Pressable  onPress={props.button_function}><View><Image style = {style.tocart} source ={ require("../../assets/to-cart.png")}/></View></Pressable>
                    </View>
            </Swipeable>
            </GestureHandlerRootView>)
}

const style = StyleSheet.create(
    {
        container: {
            
            
            height:"100%",
            marginTop:"5%",
            marginRight: "5%",
            marginBottom: 0,
            width:"100%",
            backgroundColor:"#343333",
            
            flex: 1, flexDirection: "row", justifyContent:"space-between",
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
            borderRadius:10

        },
        text_container:
        {
            flex:5,
            
        },
        price: {
          
          textAlign:'center',
          position:'absolute',
          bottom:"2%",
          alignSelf:"center",
          
          color: "#E17676",
          fontSize:36,
          fontFamily: "JetBrains-Mono"
        
           
        },
        name:{
        
           color: "#EFEFEF",
           fontFamily:"JetBrains-Mono",
           alignSelf:"center",
           textAlign:'center',
           marginBottom: 20
            
        },
        tocart:
        {
            position:'absolute',
            top:55,
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
        },
        heart:{
            width:40,
            height:40,
            alignSelf:'center',
        }
    }
)


export default Food
