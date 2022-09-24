import React, { useEffect, useReducer, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import { useState } from 'react';
import {get_data, Order_Model} from "../funcs/firestore";
import { listOrders, listOrder_Site , ITEMS_PER_PAGE} from "../funcs/order";
import Order_Panel from "./order_panel";
import Overlay from "./Overlay";

import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


function ClerkOrder(props:any)
{
    const [orders, setOrder] = useState<Order_Model[]>();
   
    const [page, setPage] = useState<number>(0);

    const rendeles_menny = useRef<number>(1);

    const [osszes_oldal, setOldal] = useState<number>(0);

    // Animacio
    const [position, setPositon] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    


    const PANEL_HEIGHT = 360;
    const BLUR_TRESHOLD = .6;

    useEffect(
        () =>{
           (async () => {
            const data = await listOrder_Site(0)
            console.log(data)
            setOldal( Math.ceil((await listOrders()).length / ITEMS_PER_PAGE) )
            
            setOrder(data);
            
           })();
            
        },[])
    console.log(page)
    useEffect(() => {

            if (position * 2 > 4 * PANEL_HEIGHT * BLUR_TRESHOLD ) 
            {
                
                const useful_position = position * 2


                
    
                const max_offset =  (rendeles_menny.current * PANEL_HEIGHT) * .2 / 1.59
                
                const actual_Offset: number = useful_position - (rendeles_menny.current * PANEL_HEIGHT) * BLUR_TRESHOLD
    
                //const actual_Opacity: number = parseInt((actual_Offset / max_offset).toFixed(2))
    
                setOffset(Math.round(actual_Offset))
                //setOpacity(actual_Opacity)
    
            }else {
                //setOpacity(1)
                setOffset(0)
            }
    
        },[position])
    
    

    return (<View style = {style.container}>
    <View style = {style.scrview}>
        <ScrollView 
         onScroll = {e => {setPositon( e.nativeEvent.contentOffset.y )}} >
            { //      ne irjon ki olyant ami kesz van vagy torolve lesz
                orders?.map((elem : Order_Model, index: number) => {
                    rendeles_menny.current++;
                    

                    const [ora, perc, ] = elem.timeCreated.split(":")
                    return <Order_Panel order_id = {elem._id}
                                        nev = {elem.name}
                                        class_ = {elem._class}
                                        items = {elem.payload}
                                        price = {elem.price}
                                        key = {index}
                                        style = {style.item}
                                        delete_button = {async () => {
                                            const doc = await firestore().collection("queue").where("order_id", "==", elem._id).get()
                                            firestore().collection("deleted_orders").add({...doc.docs[0].data()})
                                            await doc.docs[0].ref.delete();
                                            rendeles_menny.current--;
                                            setOrder(await listOrder_Site(page))
                                        }}
                                        ready_button = {async () =>
                                        {
                                            const doc = await firestore().collection("queue").where("order_id", "==", elem._id).get()
                                            
                                            firestore().collection("finished_orders").add({...doc.docs[0].data()})
                                            await doc.docs[0].ref.delete();
                                            rendeles_menny.current--;
                                            setOrder(await listOrder_Site(page))
                                        }}
                                        />
                } )
            }
            {
                rendeles_menny.current === 0 && <Text style = {{marginTop:"50%", fontSize:25, alignSelf:'center',justifyContent:"center"}}> Jelenleg nincsenek rendelések </Text>
            }
        </ScrollView>
    </View>
    <View style = {{...style.overlay, transform: [{translateY:offset}]}}>

        <Overlay 
        isClerk = {true}

        greater_than = {() => {
            console.log("ASD %i \n ASD2 %i", page, osszes_oldal)
            if (page === osszes_oldal ){
                console.log("ASD")
                return Alert.alert("ELÉRTÉL AZ UTOLSÓ OLDALIG")
                
            }
            setPage(page + 1 );
            (async () => {
                const data = await listOrder_Site(page)
                
                setOrder(data);
                
               })();
            
            }
        }
        less_than = {() => {
            if (page < 2) { return; }
            
            
            setPage(page - 1);
            (async () => {
                

                
                try{
                    const data = await listOrder_Site(page)
                    setOrder(data);
                    
                }
                
                catch (err)
                {
                   
                }
               })();
            }
        }

        button_1_function = {async () => setOrder(await listOrder_Site(page))}
        button_2_function = {props.button_function}/>
    </View>
    </View>)
}

const style = StyleSheet.create(
    {
        container:
        {
            height:"100%",
            width:"100%",
            borderRadius:20
        },
        scrview: 
        {
            height: "100%", 
            marginTop:"10%",
            
        },
        item:
        {

            alignSelf:'center',

            marginTop:"20%",
        },
        refresh:{
            position:'absolute',
            top: "92%",
            left: "5%"
        },
        exit:{
            position:'absolute',
            top: "92%",
            left:"60%"
        },overlay:
        {
            position:'absolute',
            bottom:10,
    
    
            backgroundColor: "#1a1919",
            borderRadius: 30,
            height:100,
            width: "98%",
            alignSelf:'center'
        }
    }
)

export default ClerkOrder