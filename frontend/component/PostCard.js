import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Animated, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUSer, LikePost } from "../src/api/user.api";
// import { Ionicons } from "@expo/vector-icons";

export default function PostCard({ item }) {

  const [likes , setLikes] = useState(item.likes.length)
const [islike , setisLike] = useState(item.likes.includes(getCurrentUSer))
  const [ showHeart , setShowHeart] = useState(false)
  const latTab = useRef(null)


  const Heartscale = useRef(new Animated.Value(0)).current;
const heartOpacity = useRef(new Animated.Value(0)).current
  
const handleTab =  async() =>{
  const now = Date.now()

  if (latTab.current && (now - latTab.current) < 300) {

    await LikePost(item._id)
// setShowHeart(prev => prev+1)

if (islike) {
  setLikes(prev => prev-1)
  setisLike(false)
}else{
  setLikes(prev => prev + 1)
  setisLike(true)
}

// console.log(item._id)
    
    setShowHeart(true);
    Animated.parallel([
      Animated.spring(Heartscale,{
        toValue: 1.3,
        useNativeDriver: true
      }),
      Animated.timing(heartOpacity,{
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(()=>{
      setTimeout(()=>{
        Animated.timing(heartOpacity,{
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(()=>{
          Heartscale.setValue(0)
          setShowHeart(false)
        })
      }, 400)
    })
  }
  latTab.current = now;
}

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable onPress={handleTab}>
          <Image source={{ uri: item.media }} style={styles.postImage} />
          {showHeart && (
  <Animated.View
    style={[
      styles.headerContainer,
      {
        opacity: heartOpacity,
        transform: [{ scale: Heartscale }]
      }
    ]}
  >
    <Ionicons name="heart" size={100} color="red" />
  </Animated.View>
)}
  
        {/* Gradient overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        />
        </Pressable>

        {/* Glass Header */}
        <BlurView intensity={50} tint="light" style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: item.author.profileImage }}
          />
          <View>
            <Text style={styles.userName}>{item.author.name} ✓</Text>
            <Text style={styles.handle}>@{item.author.userName}</Text>
          </View>
        </BlurView>
        {/* Bottom Content */}
        <View style={styles.footer}>
          <View style={styles.actions}>
            <View style={styles.action}>
              <Ionicons name={islike ? "heart" : "heart-outline" } 
              size={18}
                color= "white" 
              />
              <Text style={styles.count}>{likes}</Text>
            </View>

            <View style={styles.action}>
              <Ionicons name="chatbubble-outline" size={18} color="white" />
              <Text style={styles.count}>{item.comments.length}</Text>
            </View>

            <View style={styles.action}>
              <Ionicons name="paper-plane-outline" size={18} color="white" />
              <Text style={styles.count}>229</Text>
            </View>
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      </View>
      {/* Comment box */}
      <BlurView intensity={60} tint="light" style={styles.commentBox}>
        <TextInput placeholder="Add a comment..." style={styles.input} />
      </BlurView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  headerContainer:{
  position:"absolute",
  top:"40%",
  left:"40%",
  transform:[
    {translateX:-50},
    {translateY:-50}
  ]
},
  card: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },

  postImage: {
    width: "100%",
    height: 420,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  header: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },

  userName: {
    color: "white",
    fontWeight: "600",
  },

  handle: {
    color: "#ddd",
    fontSize: 12,
  },

  footer: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
  },

  actions: {
    flexDirection: "row",
    marginBottom: 6,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  count: {
    color: "white",
    marginLeft: 6,
  },

  caption: {
    color: "white",
    fontSize: 14,
  },

  commentBox: {
    marginTop: 12,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  input: {
    height: 36,
  },
});