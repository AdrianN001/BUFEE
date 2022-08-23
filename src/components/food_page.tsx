import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput,  Button ,Pressable, ScrollView} from 'react-native';
import { useState, Children } from 'react';
import { useFonts } from 'expo-font';
import Food from './food';
import Overlay from './food_page_overlay';


function Food_page()
{
    const [positon, setPosition] = useState(0);
    const [height, setHeight] = useState(0);

    let children_count = 0 //feltoltesnel majd megnoveli

    console.log(positon)
    console.log(children_count)
    console.log(`HEIGHT: ${height }`)

    return(
        < SafeAreaView style = {style.main} >
            <StatusBar style='auto'/>
            
            


            
                <ScrollView style= {{backgroundColor: ""}} onScroll = {e => setPosition(e.nativeEvent.contentOffset.y)} >
                        
                        
                        
                            <View style = {style.container}>
                                
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} name = "Sajtos  Csiga" price = "5000 Ft"/>
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />
                                    <Food style = {style.food} image = {require("../../assets/icon.png")} />


                            
                            
                            </View>
                        
                </ScrollView>
                
                <View style = {style.overlay}>
                    <Overlay />
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
        
    }
})


export default Food_page