import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import {BlurView} from "expo-blur"

import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function CustomTabBar({ state, navigation }) {
  return (
   
    <View style={styles.wrapper}>
      <BlurView
     intensity={80}
     blurType="light" 
        style={styles.container}
      >
        {state.routes.map((route, index) => {
          const isfocused = state.index === index;
          const handlePress = () => {
            navigation.navigate(route.name);
          };
          // FIX 2: Consistency in variable name (Using camelCase)
          let iconName = "";
          if (route.name === "home") iconName = "home-outline";
          else if (route.name === "Search") iconName = "search-outline";
          else if (route.name === "Favorite") iconName = "heart-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          return (
            <TouchableOpacity
              key={index}
              onPress={handlePress} 
              style={[styles.tab,
                isfocused && styles.activeTab]
              }
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isfocused ? "#000" : "#fff"}
              />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 30,
    width: width ,
    alignItems: "center",
    zIndex: 100, // Ensure it stays on top
  },
  container: {
    flexDirection: "row",
    width: width * 0.79,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderWidth: 1,
    borderColor: "rgba(255 , 255, 255 , 0.1)"
  },
  tab: {
    width: 80,
    height: 75,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab:{
    backgroundColor: "#fff"
  }
});
