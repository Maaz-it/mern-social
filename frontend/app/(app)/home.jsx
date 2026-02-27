import React from 'react';
import { View, StyleSheet , FlatList } from 'react-native';
import {Header} from '../../component/Header'; // FIXED: Removed curly braces
import { SafeAreaView } from 'react-native-safe-area-context';
import StoryItems from '../../component/Story';
import PostCard from '../../component/PostCard';

const home = () => {
  const stories = [
    {
    id: "1",
    name: "Irma",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Amanda",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  ]

  const post = [
      {
    id: "1",
    username: "Alana",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    image: "https://picsum.photos/400/300",
    likes: 1245,
    caption: "Love your mine ❤️ #foryou",
  },
  {
    id: "2",
    username: "Nina",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    image: "https://picsum.photos/400/301",
    likes: 873,
    caption: "Beautiful day 🌞",
  },
  {
    id: "3",
    username: "Nina",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    image: "https://picsum.photos/400/301",
    likes: 873,
    caption: "Beautiful day 🌞",
  },
  ]
  return (
    // Added style={{ flex: 1 }} to the container
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Header /> */}

<FlatList 
 data={post}
 keyExtractor={(item)=> item.id}
 renderItem={({item})=> <PostCard item={item}/>}
 showsVerticalScrollIndicator={false}
 ListHeaderComponent={
  <>
  <Header />

  <FlatList
  horizontal
  data={stories}
 keyExtractor={(item)=> item.id}
 renderItem={({item})=> <StoryItems item={item}/>}
 showsHorizontalScrollIndicator={false} />
  </>
 }
/>
    

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Keeps the status bar area clean
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // Optional: gives your header some breathing room
  },
  storyList: {
    // paddingHorizontal: 15,
    marginBottom: 0,
  },
});

export default home;
