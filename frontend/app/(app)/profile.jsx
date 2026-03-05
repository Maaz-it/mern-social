import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileHeader from "../../component/profile/ProfileHeader";
import PofileInfo from "../../component/profile/ProfileInfo";
import ProfileStatus from "../../component/profile/ProfileStatus";
import ProfileTab from "../../component/profile/ProfileTab";
import { getme } from "../../src/api/auth.api";

const ProfileScreen = () => {
    const [user , setUser] = useState(null)

    const fetchenduser = async  () =>{
      try {
        const res =  await getme();
        console.log("api resa" , res.data)
      setUser(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchenduser()
    },[])
  
    // console.log(fetchenduser())
  if (!user) return null;
  
  return (
    
    <ScrollView style={styles.container}>

<ProfileHeader user={user} />
<PofileInfo user ={user} />
<ProfileStatus  user={user}/>

<ProfileTab />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default ProfileScreen;