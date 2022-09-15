import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableHighlight, TouchableOpacity, LayoutChangeEvent} from 'react-native';
import { useState, Children, useRef, useEffect, createRef } from 'react';
import { useFonts } from 'expo-font';
import Food, {FoodInterface} from './food';
import Overlay from './Overlay';
import CartButton from './cart-button';
import SearchEngine from './search_engine';
import Profile from './profile';
import React from 'react';
import ClientOrders from './ClientOrders';
import Paying from './paying';
import { get_data } from '../funcs/firestore';

const FOODS: FoodInterface[] = Array.from(require("../../assets/FOODS.json"))


function Food_page(props: any)
{
    const [food_height, setFoodHeight] = useState<number>(0);
    
    const [offset, setOffset] = useState<number>(0);
    const [opacity_1, setOpacity] = useState<number>(1);

    //let overlay_ref = useRef<any>();

    const [position, setPositon] = useState<number>(0);

    const food_count = useRef<number>(0);

    const BLUR_TRESHOLD: number = .8;



    const [bucket, setBucket] = useState<FoodInterface[]>();

    const [history,setHistory] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [searching, setSearch] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("");


    const [paying, setPaying] = useState<boolean>(false);

    const om_id: string = props.om_id;

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

    return(
        < SafeAreaView style = {style.main} >
            <StatusBar style='auto'/>





                <ScrollView  
                    onScroll = {e => {setPositon( e.nativeEvent.contentOffset.y )}}  >



                            <View style = {style.container} onLayout = {(evt:any) => console.log(evt.nativeEvent.layout)}>

                                        {
                                        FOODS.map(({id, nev, price, image}) =>{
                                            food_count.current = FOODS.filter(etel => new RegExp(filter).test(etel.nev)).length
                                            

                                                if (new RegExp(filter).test(nev))
                                                {  
                                                    
                                                    return (<TouchableOpacity
                                                            onLongPress={
                                                                () => {
                                                                    const bucket_1 = bucket ?? []

                                                                    if (bucket_1.length >= 4)
                                                                    {
                                                                        Alert.alert("HIBA", "Legfeljebb 4 dolgot rendelhetsz egyszerre")
                                                                        return;
                                                                    }

                                                                    const buy_id = bucket_1.length
                                                                    setBucket([...bucket_1 , {id, nev, price, image, buy_id}])}
                                                            }
                                                            style = {{height: 150}}>
                                                                    <Food key = {id}
                                                                
                                                                    image ={require("../../assets/icon.png")} 
                                                                    name = {nev} 
                                                                    
                                                                    getHeight = {(magassag: number) => setFoodHeight(!magassag ? Math.min(magassag, food_height): magassag)}
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
                                                                }  />
                                                    </TouchableOpacity>)
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

                {
                    offset < 110 && <View style = {{...style.overlay,transform: [{translateY: offset}]}}  >
                        <Overlay  
                            isClerk = {false}
                            button_1_function = {() => setHistory(true)} 
                            button_2_function = {() => setProfile(true)} 
                            button_3_function = {() => setSearch(!searching)}

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
