// components/profile/ProfileDetails.js

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { getme } from "../../src/api/auth.api";
import { useEffect } from "react";


export default function ProfileDetails() {


  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.title}>About me</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Work Experience</Text>
        <Text style={styles.text}>
          UI/UX Designer at Google
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "gray",
  },
});