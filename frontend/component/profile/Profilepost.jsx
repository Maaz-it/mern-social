import React from "react";
import { Dimensions, Image, FlatList, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const itemSize = width / 3;

const DummyPost = Array.from({ length: 12 }).map((_, e) => ({
  id: e.toString(),
  image: `https://picsum.photos/300?random=${e}`,
}));

export default function ProfilePost() {
  return (
    <FlatList
      data={DummyPost}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
      )}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: itemSize,
    height: itemSize,
  },
});