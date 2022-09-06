import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableHighlight, TouchableOpacity, LayoutChangeEvent} from 'react-native';
import { useState, Children, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Food, {FoodInterface} from './food';
import Overlay from './food_page_overlay';
import CartButton from './cart-button';
import SearchEngine from './search_engine';
import Profile from './profile';
import React from 'react';
import History from './history';
import Paying from './paying';
import { get_data } from '../funcs/firestore';

const FOODS: FoodInterface[] = Array.from(require("../../assets/FOODS.json"))


function Food_page(props: any)
{
    const [positon, setPosition] = useState(0);
    const [viewHeight, setViewHeight] = useState(0);
    const [food_height, setFoodHeight] = useState<number>(0);

   // const [food_titles, setFoodTitle] = useState<number>(0)

    const overlay_ref = useRef();

    const food_count = useRef<number>(0);

    const food_size = useRef<number>(120);

    const transform_formula = (food_size.current * food_count.current) 


    

   


    const [bucket, setBucket] = useState<FoodInterface[]>();

    const [history,setHistory] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [searching, setSearch] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("");


    const [paying, setPaying] = useState<boolean>(false);

    const om_id: string = props.om_id;

    

    return(
        < SafeAreaView style = {style.main} >
            <StatusBar style='auto'/>





                <ScrollView  
                   
                >



                            <View style = {style.container} >

                                        {
                                        FOODS.map(({id, nev, price, image}) =>{

                                                if (new RegExp(filter).test(nev))
                                                {  
                                                    food_count.current++
                                                    
                                                    return (<Food key = {id}
                                                       
                                                        image ={require("../../assets/icon.png")} 
                                                        name = {nev} 
                                                        price = {`${price} Ft`} 
                                                        button_function = {() => {
                                                            const bucket_1 = bucket ?? []

                                                            if (bucket_1.length >= 4)
                                                            {
                                                                Alert.alert("HIBA", "Legfeljebb 4 dolgot rendelhetsz egyszerre")
                                                                return;
                                                            }

                                                            const buy_id = bucket_1.length
                                                            setBucket([...bucket_1 , {id, nev, price, image, buy_id}])}
                                                    }  />)
                                                }



                                                })
                                    }


                            </View>

                </ScrollView>

                {searching && <View style = {style.searchengine}>


                    <SearchEngine updateSearch = {(text: string) => setFilter(text)} />
                    <View style = {style.searchengine_overlay}/>
                </View>}


                {
                    bucket && bucket?.length >= 1 &&
                        <View style = {style.cartbutton} >
                            <TouchableOpacity onPress={() => setPaying(true)}>
                                <CartButton count = {bucket?.length}/>
                            </TouchableOpacity>
                        </View>
                }

                <View style = {{...style.overlay}}  >
                    <Overlay  
                        activateHistory = {() => setHistory(true)} 
                        activateProfile = {() => setProfile(true)} 
                        activateSearch = {() => setSearch(!searching)}

                    />
                </View>

                {profile && <Profile style = {{ backgroundColor: "#000" }} omid = {om_id} setButton = {() => setProfile(false)}/>}
                {history && <History style = {{ backgroundColor: "#000" }} omid = {om_id} setButton = {() => setHistory(false)}/>}
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

        marginTop: "8%",
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
        top:"20%",
        alignSelf:'center',
        width:"70%",
        height:"30%",
        borderColor:"#f5c4c4"

    },
    searchengine_overlay:
    {
        backgroundColor:"rbga(232, 165, 165,0.8)",

        height:"80%",
        width:"100%"

    }



})


export default Food_page
