
import React, { useState } from "react";


import {Text , View , StyleSheet , TouchableOpacity} from "react-native"

import ProfilePost from "./Profilepost";

import ProfileDetail from "./ProfileDetail";


const ProfileTab = () =>{

    const [active , setActive] = useState("profile")

    return(
        <View style={styles.container}>
    <View style={styles.tabbody}>

<TouchableOpacity 
style={styles.tab}
onPress={() => setActive("post")}
>
    <Text style={active === "post" ? styles.activeText : styles.text} >
Post
    </Text>
{active === "post" && <View style={styles.indictort} />}
</TouchableOpacity>


<TouchableOpacity 
style={styles.tab}
onPress={()=>setActive("detail")}
>
    <Text style={active === "detail" ? styles.activeText : styles.text}>
Details
    </Text>

{active==="detail"  && <View style={styles.indictort} />}
</TouchableOpacity>
    </View>

{/* tab conetnet  */}
{active === "post" ? <ProfilePost /> : <ProfileDetail />}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 10,      
    },
    tabbody:{
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    tab:{
        alignItems: "center",
        paddingVertical: 10,
        width : "50%"
    },
    text:{
        color: "gray"
    },
    activeText: {
        fontWeight: "bold"
    },
    indictort: {
        marginTop: 6,
        height: 2,
        width: "60%",
        backgroundColor: "black"
    }
})

export default ProfileTab

