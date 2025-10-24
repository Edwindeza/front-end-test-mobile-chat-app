import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { LoginContainer } from "@/modules/user/containers/LoginContainer";
import { User } from "@/shared/types";

const mockLogin = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("@/shared/hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock("@/modules/user/hooks/useUsers", () => ({
  useUsers: () => ({
    users: [
      { id: "1", name: "Alice", avatar: "avatar1.png", status: "online" },
      { id: "2", name: "Bob", avatar: "avatar2.png", status: "online" },
    ],
  }),
}));

jest.mock("@/modules/user/components/UserListItem", () => ({
  UserListItem: ({ user, onSelect }: { user: User; onSelect: () => void }) => {
    const React = require("react");
    const { TouchableOpacity, Text } = require("react-native");
    return React.createElement(
      TouchableOpacity,
      { testID: `user-${user.id}`, onPress: onSelect },
      React.createElement(Text, null, user.name)
    );
  },
}));

describe("LoginContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockResolvedValue(true);
  });

  it("should render list of users", () => {
    const { getByTestId } = render(<LoginContainer />);

    expect(getByTestId("user-1")).toBeTruthy();
    expect(getByTestId("user-2")).toBeTruthy();
  });

  it("should call login when user is selected", async () => {
    const { getByTestId } = render(<LoginContainer />);

    fireEvent.press(getByTestId("user-1"));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockLogin).toHaveBeenCalledWith("1");
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
  });
});
