import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hey {userData ? userData.name : "Developer"} 👋
      </Text>
      {/* <Text style={styles.title}>Welcome to our product</Text> */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    maxWidth: 300,
  },
  button: {
    borderWidth: 1,
    borderColor: "#1a1a1a",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});

export default Header;
