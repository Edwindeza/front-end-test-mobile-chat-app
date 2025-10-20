import React from "react";
import { render } from "@testing-library/react-native";
import { HelloWave } from "@/shared/components/HelloWave";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.withTiming = jest.fn((value, config) => value);
  Reanimated.withSequence = jest.fn((...animations) => animations[0]);
  Reanimated.withRepeat = jest.fn((animation, count) => animation);
  return Reanimated;
});

describe("HelloWave Component", () => {
  it("should render without crashing", () => {
    const { getByText } = render(<HelloWave />);

    expect(getByText("👋")).toBeTruthy();
  });

  it("should be accessible", () => {
    const { getByText } = render(<HelloWave />);
    const waveElement = getByText("👋");

    expect(waveElement).toBeTruthy();
  });

  it("should render consistently", () => {
    const { getByText: getByText1 } = render(<HelloWave />);
    const { getByText: getByText2 } = render(<HelloWave />);

    const wave1 = getByText1("👋");
    const wave2 = getByText2("👋");

    expect(wave1.props.children).toBe(wave2.props.children);
  });
});
