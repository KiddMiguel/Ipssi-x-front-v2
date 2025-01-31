import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/auth/authThunk";
import "../../global.css";
import Global from "@/constants/Global";

export default function RegisterScreen() {
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      await dispatch(register(credentials)).unwrap();
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Une erreur est survenue");
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <ScrollView>
        <View className="bg-white rounded-lg shadow-lg p-8">
          <View className="items-center mb-8">
            <Feather name="twitter" size={32} color="#3b82f6" />
          </View>

          <Text className="text-2xl font-bold text-center mb-8">
            Inscrivez-vous à X
          </Text>

          {/* Form */}
          <View className="space-y-6">
            {/* Username Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="Nom d'utilisateur"
                value={credentials.username}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, username: text })
                }
              />
            </View>

            {/* Name Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Nom
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="Nom"
                value={credentials.name}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, name: text })
                }
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Email
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="nom@exemple.com"
                keyboardType="email-address"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text })
                }
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="••••••••"
                secureTextEntry
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className="w-full bg-blue-500 p-3 rounded-md"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-medium">
                S'inscrire
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="mt-6">
              <Text className="text-sm text-gray-600 text-center">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/login" className="text-blue-500 font-medium">
                  Connectez-vous
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
