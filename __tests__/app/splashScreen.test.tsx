import React from "react";
import { render } from "@testing-library/react-native";
import CustomSplashScreen from "@/app/_layout";

describe("Splash Screen", () => {
  it("should render splash screen initially", () => {
    const { getByText } = render(<CustomSplashScreen />);

    expect(getByText("Chat App")).toBeTruthy();
    expect(getByText("Conectando...")).toBeTruthy();
    expect(getByText("👋")).toBeTruthy();
  });

  it("should have expected texts", () => {
    const { getByText } = render(<CustomSplashScreen />);

    const chatAppText = getByText("Chat App");
    const connectingText = getByText("Conectando...");
    const waveEmoji = getByText("👋");

    expect(chatAppText).toBeTruthy();
    expect(connectingText).toBeTruthy();
    expect(waveEmoji).toBeTruthy();
  });
});
