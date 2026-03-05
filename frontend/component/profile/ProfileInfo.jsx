import { useRouter } from "expo-router";
import { Link } from "expo-router";
import React, { useState } from "react";

import { Modal } from "react-native";


import { View , Text , StyleSheet , TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import EditProfile from "./EditProfile";

export default function PofileInfo({user}) {

  const [visible , setVisible] = useState(false)




  // const router  = useRouter()

  // const navigation = useNavigation()

// const handleeditprofile = () => {
//   navigation.navigate("EditProfile");
// };

// console.log("hittinf ")


    
    return (
       <View style={styles.container}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.userName}>{user.userName}</Text>

            <Text style={styles.bio}>
              {user.email ? user.email : "uremail@gmail.com"}     </Text>
            <Text style={styles.bio}>
              {/* {user.bio} */}
              {user.bio ? user.bio : "Ur Bio "}
            </Text>
            <Text style={styles.bio}>{user.profetion ? user.profetion: "Full stackdev"}</Text>
           
           
        <TouchableOpacity style={styles.button} onPress={()=> setVisible(true)}>
  <Text style={styles.buttonText}>Edit Profile</Text>
</TouchableOpacity>

<EditProfile 
visible={visible}
setVisible={setVisible}
user={user}/>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 5,
    },
     name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    color: "gray",
    marginVertical: 4,
  },
  bio: {
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "600",
  }
})