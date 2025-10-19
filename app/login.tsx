import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/shared/components/ThemedText";
import { ThemedView } from "@/shared/components/ThemedView";
import { LoginContainer } from "@/src/modules/user/containers/LoginContainer";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Welcome to Chat App</ThemedText>
          <ThemedText style={styles.subtitle}>
            Select a user to continue
          </ThemedText>
        </ThemedView>

        <LoginContainer />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#8F8F8F",
  },
  listContainer: {
    paddingBottom: 20,
  },
});
