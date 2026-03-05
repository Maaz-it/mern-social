import React from "react";

import {Text , View , StyleSheet} from "react-native"

export default function ProfileStatus({user}) {
    
    return (
        <View style={styles.container}>

 {/* <Stacks number={user.post ? user.post: 20}  label="Post" />
  */}


<Stacks 
 number={user.post ? user.post.length : 0}
 label="Post"
/>

 <Stacks number={user.reels ? user.reels.length : 0}  label="Reels" />

 <Stacks number={user.followers? user.followers.length : 10}  label="Followers" />

 <Stacks number={user.following ? user.following.length: 10}  label="Follwing" />

 <Stacks number={user.saved ? user.saved.length: 10}  label="saved" />

        </View>
    )
}

function Stacks({number , label}) {
    
    return (
        <View style={styles.stats}>
 <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    stats:{
        alignItems: "center",
        padding: 10,
    },
    number:{
        fontWeight: "500",
        fontSize: 18
    },
    label:{
        color: "gray",
        fontSize: 12
    }
})