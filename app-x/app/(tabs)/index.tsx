import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { getPosts, getPostsBefore } from "../../redux/Posts/postSlice";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Global from "@/constants/Global";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { posts, loading, hasMore } = useSelector((state) => state.post);
  const observer = useRef();

  useEffect(() => {
    dispatch(getPostsBefore()); // Charger les premiers posts
  }, [dispatch]);

  // Fonction de chargement pour le scroll infini
  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(getPostsBefore());
    }
  }, [loading, hasMore, dispatch]);

  // Gestion du dernier élément pour observer le scroll
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts]
  );

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* HEADER */}
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

        {/* Liste des publications avec scroll infini */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View ref={index === posts.length - 1 ? lastPostElementRef : null}>
              <PostCard post={item} />
            </View>
          )}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.2} // Charge avant d'atteindre complètement le bas
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="small" color="#3b82f6" />
            ) : !hasMore ? (
              <Text className="text-center text-gray-500 my-4">
                Plus de posts disponibles
              </Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
