import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView, Alert, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Food, { FoodInterface } from './food';
import HistoryFood from './history_food';
import React, { useEffect, useState } from 'react';
import addOrder from '../funcs/order';
import { User_Model } from '../funcs/firestore';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


const calculate_final = (bucket: FoodInterface[]) => 
{
    let current = 0;

    for (const elem of bucket)
    {
        current += parseInt(elem.price) 
    }

    return current
}

export default function Paying(props: any)
{

    const [bucket, setBucket] = useState<FoodInterface[]>(props.bucket)
    const [omid, setOMID] = useState<string>(props.omid);

   

    const full_price = calculate_final(bucket)


    return (
        <View style = {style.container}>
            <Text style = {style.title}>KOSÁR</Text>

        

            
            <View style = {style.list}>
                {
                    bucket.length !== 0 
                     ? (
                        <>
                        
                            {bucket.map((value, index) => {
                            
                            const {nev, price} = (value as FoodInterface)
                            
                            return <HistoryFood key = {index} style = {style.item} image ={require("../../assets/icon.png")} name = {nev} price = {`${price} Ft`} button_function = {()=>
                            {
                                let temp = [...bucket]
                                temp.splice(index, 1)
                                
                                
                                
                                props.updateBucket(temp)

                                setBucket(temp)

                                
                            }} />
                            
                            }
                        
                        )
                        }
                        <View style={{ marginTop:10, borderRadius: 8, borderColor:"#8a2f39", borderWidth:8, borderBottomWidth: StyleSheet.hairlineWidth}}></View>
                        <View style = {{width:"100%", backgroundColor:"white"}}>
                            <Text style = {{...style.price, position:'absolute',top:"10%",left:"50%"}}>{`${full_price} Ft`}</Text>
                            <Text style = {{...style.price, position:'absolute',top:"10%",left:"0%"}}>{"Összesen:"}</Text>
                        </View>
                        </>)
                     : (<>
                            <Text style = {style.empty_bucket}>{"ÜRES A KOSARAD"}</Text>
                            
                            <Text style = {{...style.empty_bucket, marginRight:"50%", transform: [{rotate:'265deg'}]}}>{"):"}</Text>
                      </>)
                }
            </View>
            


            <TouchableOpacity style = {style.paywithcash} 
                              onPress = {async( ) => {

                                const current_orders: number = (await firestore().collection("queue").where("om_id", "==", omid).get()).docs.length
                                if (current_orders <= 2 )
                                {
                                    addOrder(omid, bucket, true);
                                }else{
                                    Alert.alert("HIBA", "Túl sok rendelésed van leadve egyszerre. \n \n Tipp: Nézdd meg az előzö rendeléseidet. A kész rendeléseket kitörölheted, ezzel hely szabadul fel.")
                                }
                            }
                }>
                <Image source={require("../../assets/paywithcash.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style = {style.paywithcard} 
                              onPress = {async () => {

                                const current_orders: number = (await firestore().collection("queue").where("om_id", "==", omid).get()).docs.length
                                if (current_orders <= 2 )
                                {
                                    addOrder(omid, bucket, true);
                                }else{
                                    Alert.alert("HIBA", "Túl sok rendelésed van leadve egyszerre. \n \n Tipp: Nézdd meg az előzö rendeléseidet. A kész rendeléseket kitörölheted, ezzel hely szabadul fel.")
                                }
                            }
                            }>
                <Image source={require("../../assets/paywithcard.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.back_button} style = {style.back}>
                <Image source={require("../../assets/backsmall.png")}/>
            </TouchableOpacity>
        </View>
    )



}

const style = StyleSheet.create(
    {
        container:
        {
            position:'absolute',
            alignSelf:"center",


            backgroundColor: "#232323",
            width: "98%",
            height:"98%",
            borderRadius:20
        },
        title:{
            position:'absolute',
            top:"2%",
            alignSelf:'center',
            fontSize:60,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
        },
        list:{
            
            width:'90%',
            height:"30%",
            alignSelf:'center',
            position:'absolute',
            top:"15%"
        },
        scrView:{
            height:"100%"
        },
        item:
        {
            marginBottom:10,
            width:"30%",
            
        },
        back:{
            position:'absolute',
            alignSelf:'center',
            bottom:"1%"
        },
        paywithcash:
        {
            position:'absolute',
            alignSelf:'center',
            bottom:"21%"
        },
        paywithcard:
        {
            position:'absolute',
            alignSelf:'center',
            bottom:"10%"
        },
        empty_bucket:
        {
            position:'absolute',
            alignSelf:'center',
            
            top:"30%",
            
            fontSize:35,
            fontFamily:'Caveat',
            color:"#E17676",
            fontStyle:'italic',
            textShadowColor: 'rgba(225, 118, 118, 0.7)',
            textShadowOffset: {width: 1, height: -1},
            textShadowRadius: 20
        },
        price:
        {
            color:"#E17676",
            fontFamily:"JetBrains-Mono",

            fontSize:20,
        }
    }
)