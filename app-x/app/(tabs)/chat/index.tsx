import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUsers } from "../../../Redux/auth/authSlice";
import { useRouter } from "expo-router";
import ChatListItem from "@/components/ChatListItem";
import Global from "@/constants/Global";

export default function ChatScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, users, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/login");
  };

  if (status === "loading") {
    return (
      <SafeAreaView style={Global.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (status === "failed") {
    return (
      <SafeAreaView style={Global.container}>
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Global.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Hi, {user?.name}
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full">
          <Feather name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Rechercher une conversation"
            placeholderTextColor="#666"
          />
        </View>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            id={item.id}
            name={item.username}
            lastMessage={item.lastMessage || "No messages"}
            time={item.time || ""}
            isOnline={item.isOnline || false}
          />
        )}
        className="flex-1"
      />
    </SafeAreaView>
  );
}
