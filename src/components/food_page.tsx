import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert} from 'react-native';
import { useState, Children, useRef } from 'react';
import { useFonts } from 'expo-font';
import Food, {FoodInterface} from './food';
import Overlay from './food_page_overlay';
import CartButton from './cart-button';
import SearchEngine from './search_engine';
import React from 'react';

const FOODS: FoodInterface[] = Array.from(require("../../assets/FOODS.json"))


function Food_page(props: any)
{
    const [positon, setPosition] = useState(0);
    const [height, setHeight] = useState(0);

    const [bucket, setBucket] = useState<FoodInterface[]>();
    const [searching, setSearch] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("");

    const om_id: string = props.om_id
    
    console.log(new RegExp(filter).test("Sonkás Gombás \nMelegszendvics"))




    return(
        < SafeAreaView style = {style.main} >
            <StatusBar style='auto'/>
            
            


            
                <ScrollView style= {{backgroundColor: ""}} onScroll = {e => setPosition(e.nativeEvent.contentOffset.y)} >
                        
                        
                        
                            <View style = {style.container} >

                                        {
                                        FOODS.map(({id, nev, price, image}) =>{
                                                

                                                if (new RegExp(filter).test(nev))
                                                {
                                                    return (<Food key = {id} stlye = {style.food} image ={require("../../assets/icon.png")} name = {nev} price = {`${price} Ft.`} order_function = {() => {
                                                        const bucket_1 = bucket ?? []
        
                                                        if (bucket_1.length >= 5)
                                                        {
                                                            Alert.alert("HIBA", "Legfeljebb 5 dolgot rendelhetsz egyszerre")
                                                            return;
                                                        }
                                                        setBucket([...bucket_1 , {id, nev, price, image}])}
                                                    }/>)
                                                }
                                            
                                                
                                            
                                                })
                                    }     
{/*                                 
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} name = "Sajtos  Csiga" price = "5000 Ft"/>
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} /> */}


                            
                            
                            </View>
                        
                </ScrollView>
                
                {searching && <View style = {style.searchengine}>
                    
                    <SearchEngine updateSearch = {(text:string) => setFilter(text)} />
                   
                </View>}
                

                {bucket && bucket?.length >= 1 && <View style = {style.cartbutton} >
                    <CartButton count = {bucket?.length}/>
                </View>}
                
                <View style = {style.overlay}>
                    
                    <Overlay activateSearch = {() => setSearch(!searching)}/>
                </View>
                
                            
                
            
            

            


        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    main: {
        backgroundColor:'#303030',
        height: "100%"
    },
    container: {
        showsVerticalScrollIndicator: true,

        marginTop: "10%",
        marginLeft: 15,
        backgroundColor: "",
        
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    list :{
        
        marginTop:"10%",
        alignItems:'center',
        height: "100%",
        zIndex: -1,
        elevation: -1
    },
    food: {
        margin: 10
    },
    overlay:
    {
        
        position:'absolute',
        bottom:10,
        
       
        backgroundColor: "#222222",
        borderRadius: 30,
        height:100,
        width: "98%",
        alignSelf:'center'
        
    },
    cartbutton:
    {
        position:'absolute',
        top: "65%",
        left:"82%",
        height: "100%",
        //backgroundColor: "rgba(0,0,0,0.8)",
        opacity:.9
    },
    searchengine:
    {
        position:'absolute',
        top:"20%",
        right:"15%",
        width:"70%",
        height:"30%",
        borderColor:"#f5c4c4"
        
    },
    // searchengine_margin:
    // {
    //     backgroundColor:"#f5c4c4",

    // }
    
    
    
})


export default Food_page