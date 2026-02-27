import React from "react";

import { View, Text , Image , StyleSheet } from "react-native";

export default function PostCard({item}) {
    return (
        <View style={styles.container}>
         <View style={styles.imageWrapper}>
           <Image source={{uri: item.image}} style={styles.postImage} />

            <View style={styles.header}>
                <Image style={styles.avatar} source={{uri:  item.avatar}} />
                <Text style={styles.userName}>{item.username}</Text>
            </View>

            
            <View style={styles.footer}>
                 <Text style={styles.likes}>❤️ {item.likes} likes</Text>
        <Text style={styles.caption}>{item.caption}</Text>
                </View> 
                  </View>
        </View>
    )
}


const styles = StyleSheet.create({
container:{
    marginTop: 10,
    padding: 10,
    // backgroundColor: "blue"
},
imageWrapper:{

},
header:{
    flexDirection: "row",
    alignItems:"center",
    padding: 10
},
avatar:{
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10
},
userName:{
    fontWeight: "bold"
},
postImage: {
    width: "100%",
    height: 300,
  },
  footer: {
    padding: 10,
  },
  likes: {
    fontWeight: "bold",
  },
  caption: {
    marginTop: 5,
  },
})