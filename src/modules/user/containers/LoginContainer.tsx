import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "expo-router";
import { Alert, FlatList, StyleSheet } from "react-native";
import { UserListItem } from "../components/UserListItem";
import { useUsers } from "../hooks/useUsers";

export const LoginContainer: React.FC = () => {
  const { login } = useAuth();
  const { users } = useUsers();
  const router = useRouter();

  const handleUserSelect = async (userId: string) => {
    const loggedIn = await login(userId);
    if (!loggedIn) {
      Alert.alert("Error", "Failed to login");
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserListItem user={item} onSelect={() => handleUserSelect(item.id)} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
});
