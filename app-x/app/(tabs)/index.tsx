import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/authSlice";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-800">
        Bienvenue sur la page d'accueil
      </Text>
      <TouchableOpacity
        className="mt-4 bg-red-500 p-3 rounded-md"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-medium">
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}
