import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from "react-native";
import home from "../(app)/home";
import ProfileScreen from "./profile";
// FIXED PATH:
import CustomTabBar from "../../component/CustomTabbar"; 

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return(
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="home" component={home} />
            <Tab.Screen name="Search" component={() => <View><Text>Search</Text></View>} />
            <Tab.Screen name="Favorite" component={() => <View><Text>Fav</Text></View>} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
