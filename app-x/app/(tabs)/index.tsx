import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/auth/authSlice";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Global from "@/constants/Global";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";

const mockPosts = [
  {
    _id: "1",
    name: "Alice Dupont",
    author: "aliceD",
    content: "Hello world! #ReactNative",
    createdAt: new Date().toISOString(),
    likes: ["user1", "user2"],
  },
  {
    _id: "2",
    name: "Jean Martin",
    author: "jeanM",
    content: "Une belle journée ☀️",
    createdAt: new Date().toISOString(),
    likes: ["user3"],
  },
  {
    _id: "3",
    name: "Claire Fontaine",
    author: "claireF",
    content: "React Native c'est top ! 🚀",
    createdAt: new Date().toISOString(),
    likes: [],
  },
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={Global.container}>
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-300">
        <Text className="text-lg font-bold">
          Bonjour, {user?.name || "Utilisateur"}
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* CONTENU PRINCIPAL */}
      <View className="flex-1 bg-white">
        {/* Formulaire de publication */}
        <PostForm />

        {/* Liste des publications */}
        <FlatList
          data={mockPosts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
