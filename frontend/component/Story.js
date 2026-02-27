import React from "react";
import { View , Text , Image , StyleSheet } from "react-native";

export default function StoryItems({ item }) {
    return (
        <View style={styles.container}>

<Image source={{uri : item.avatar}} style={styles.avatar} />
<Text style={styles.name}>{item.name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignContent: "center",
        marginRight: 15,
    },
    avatar:{
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name:{
        marginTop: 5,
        fontSize: 14
    }
})