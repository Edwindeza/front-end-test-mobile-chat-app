import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/shared/components/HapticTab";
import { IconSymbol } from "@/shared/components/IconSymbol";
import TabBarBackground from "@/shared/components/TabBarBackground";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import {
  createTabBarStyles,
  getTabBarColors,
} from "@/src/shared/styles/tabBarStyles";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        ...getTabBarColors,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        ...createTabBarStyles,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
