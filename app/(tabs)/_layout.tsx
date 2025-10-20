import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/shared/components/HapticTab";
import TabBarBackground from "@/shared/components/TabBarBackground";
import {
  createTabBarStyles,
  getTabBarColors,
} from "@/shared/styles/tabBarStyles";
import { getTabIcon } from "@/shared/components/TabIcons";
import { useColorScheme } from "@/shared/hooks/useColorScheme.web";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        ...getTabBarColors(colorScheme ?? "light"),
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        ...createTabBarStyles(colorScheme ?? "light"),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, focused }) =>
            getTabIcon("index", color, focused),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            getTabIcon("profile", color, focused),
        }}
      />
    </Tabs>
  );
}
