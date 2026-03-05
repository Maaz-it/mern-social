import { StyleSheet, Text  , Image , View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const ProfileHeader = ({user}) => {
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <Image source={{ uri: "https://picsum.photos/600/300" }}
        style={styles.cover} />
        <View style={styles.avatarWrapper}>
            <Image 
            // source={{ uri: user.profileImage ? user.profileImage : "https://i.pinimg.com/1200x/95/d3/32/95d33248b06184235bfe7f0dc0ace640.jpg" }}
            
            source={{
              uri: 
              user?.profileImage || 
              "https://i.pinimg.com/1200x/95/d3/32/95d33248b06184235bfe7f0dc0ace640.jpg"
            }}
            style={styles.avatar} 
            />
        </View>
      </View> 
    </SafeAreaView>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container: { 
    position: "relative"
  },
  cover: {
    width:  "100%",
    height: 200,
     padding: 10,
  },
  avatarWrapper:{
   
    position:"absolute",
    bottom: -40,
    alignSelf: "center"
  },
  avatar:{
    width: 110,
    height: 110,
    borderRadius: 45,
    borderWidth: 3,
    borderColor:" #fff"

  }

})
