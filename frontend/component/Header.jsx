import React from "react";

import { View, Text, StyleSheet } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export  const Header = () =>{
    return(
        <View style={styles.conteiner}>

{/* logo  */}

<Text style={styles.title}>
Socialsscense
</Text>

<Ionicons 
name="notifications-outline" 
size={28}
/>

        </View>
    )
}

const styles = StyleSheet.create({
  conteiner: {
    padding: 15,
    backgroundColor: "#fff",
    flex : 1,
    flexDirection : "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 20,
    fontWeight: "light",
  },
});