import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableHighlight, TouchableOpacity, LayoutChangeEvent, AsyncStorage} from 'react-native';
import { useState, Children, useRef, useEffect, createRef } from 'react';
import Food, {FoodInterface} from './food';
import Overlay from './Overlay';
import CartButton from './cart-button';
import SearchEngine from './search_engine';
import Profile from './profile';
import React from 'react';
import ClientOrders from './ClientOrders';
import Paying from './paying';
import { update_liked, get_liked } from '../funcs/firestore';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { GestureHandlerRootView } from 'react-native-gesture-handler';


const FOODS: FoodInterface[] = Array.from(require("../../assets/FOODS.json"))

const search_conditional = (input1: string, input_2: string) => new RegExp(input1).test(input_2)

function Food_page(props: any)
{
    const [food_height, setFoodHeight] = useState<number>(0);
    
    const [offset, setOffset] = useState<number>(0);

    const [position, setPositon] = useState<number>(0);

    const food_count = useRef<number>(0);

    const BLUR_TRESHOLD: number = .8;



    const [bucket, setBucket] = useState<FoodInterface[]>();

    const [history,setHistory] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);

    const [searching, setSearch] = useState<boolean>(false);
    const [loved, setLoved] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("");


    const [paying, setPaying] = useState<boolean>(false);

    const om_id: string = props.om_id;

    const [favs, setFavs] = useState<number[]>([]);

    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {

                        

        if (position * 2 > (food_count.current * food_height) * BLUR_TRESHOLD &&  food_count.current > 5) 
        {
            const useful_position = position * 2
            

            const max_offset =  (food_count.current * food_height) * .2 / 1.59
            
            const actual_Offset: number = useful_position - (food_count.current * food_height) * BLUR_TRESHOLD

            //const actual_Opacity: number = parseInt((actual_Offset / max_offset).toFixed(2))

            setOffset(Math.round(actual_Offset))
            //setOpacity(actual_Opacity)

        }else {
            //setOpacity(1)
            setOffset(0)
        }

    },[position])

    

    useEffect(() =>{
        firestore().collection("users").where("om_id", "==", om_id).get().then(adat => 
            {
                const loved = adat.docs[0].data().favorites
                console.log(loved)
                setFavs(loved)
                
                
            })
            
    },[loved])


   

    return(
        < SafeAreaView style = {style.main} >
            <StatusBar style='auto'/>



            
                <View style = {{ height: "88%", top:"12%"}}>
                    
                    <ScrollView  
                        style = {{height:"100%"}} onScroll = {e => {setPositon( e.nativeEvent.contentOffset.y )}}  >


                                
                                
                                <View style = {style.container} >

                                            {
                                             FOODS.map(({id, nev, price, image}) =>{
                                                food_count.current = FOODS.filter(etel => new RegExp(filter).test(etel.nev)).length

                                                    if (!loved ? search_conditional(filter,nev) : favs.includes(id))
                                                    {  
                                                        
                                                        return (
                                                            
                                                        

                                                        
                                                                        <View style = {{height: 150, width:"100%"}}>
                                                                        <Food key = {id}

                                                                        id = {id}
                                                                        favorites = {favs}

                                                                        om_id = {om_id}
                                                                        
                                                                        isLiked = { favs.includes(id) }
                                                                        hearth_function = {() => console.log("Gomb megnyomva itt: %i", id)}

                                                                        name = {nev} 
                                                                        
                                                                        getHeight = {(magassag: number) => setFoodHeight(!magassag ? Math.min(magassag, food_height): magassag)}
                                                                        price = {`${price} Ft.`} 
                                                                        button_function = {() => {
                                                                            const bucket_1 = bucket ?? []

                                                                            if (bucket_1.length >= 4)
                                                                            {
                                                                                Alert.alert("HIBA", "Legfeljebb 4 dolgot rendelhetsz egyszerre")
                                                                                return;
                                                                            }

                                                                            const buy_id = bucket_1.length
                                                                            setBucket([...bucket_1 , {id, nev, price, image, buy_id}])}
                                                                    }  />
                                                                    </View>)
                                                    }



                                                    })
                                           
                                        }


                                </View>
                               

                    </ScrollView>
                </View>
                

                <View style = {style.searchengine}>
                    <Pressable onLongPress={() => setLoved(!loved)} style = { {width: 60,height:60, left:'110%', bottom:"-100%"} }>
                        <Image source = {loved ? require("../../assets/red_heart.png") : require("../../assets/white_heart.png")} 
                         style = {{ width: "100%", height:"100%"}}/>
                    </Pressable>
                    <SearchEngine updateSearch = {(text: string) => setFilter(text)} />
                </View>


                {
                    bucket && bucket?.length >= 1 &&
                        <View style = {style.cartbutton} >
                            <TouchableOpacity onPress={() => setPaying(true)}>
                                <CartButton count = {bucket?.length}/>
                            </TouchableOpacity>
                        </View>
                }

                {
                    !paying && !history && !profile && offset < 110 && <View style = {{...style.overlay,transform: [{translateY: offset}]}}  >
                        
                        <Overlay  
                            isClerk = {false}
                            button_1_function = {() => setHistory(true)} 
                            button_2_function = {() => setProfile(true)} 

                            //style = {{backgroundColor: `rgba(0,0,0,${opacity_1})`}}

                        />
                    </View>
                }

                {profile && <Profile style = {{ backgroundColor: "#000" }} omid = {om_id} setLogout = {() => props.setLogout(false)} setButton = {() => setProfile(false)}/>}
                {history && <ClientOrders style = {{ backgroundColor: "#000" }} omid = {om_id} setButton = {() => setHistory(false)}/>}
                {paying && <Paying omid = {om_id} updateBucket = {(bucket: FoodInterface[]) => setBucket(bucket)} bucket = {bucket} back_button = {() => setPaying(false)}/>}




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

        marginTop: "0%",
        marginBottom:"10%",
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
        top:"-3%",
        alignSelf:'center',
        left:"3%",
        width:"70%",
        height:"8%",
        borderColor:"#f5c4c4"

    },
    



})


export default Food_page
