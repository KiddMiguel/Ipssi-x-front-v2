import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import '../../global.css';
import Global from '@/constants/Global';

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = () => {
    // Ici vous ajouterez la logique de connexion
    console.log('Login attempt:', credentials);
  };

  return (
    <SafeAreaView style={Global.container}>
      <ScrollView >
        <View className="bg-white rounded-lg shadow-lg p-8">
          <View className="items-center mb-8">
            <Feather name="twitter" size={32} color="#3b82f6" />
          </View>
          
          <Text className="text-2xl font-bold text-center mb-8">
            Connectez-vous à X
          </Text>

          {/* Form */}
          <View className="space-y-6">
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
                onChangeText={(text) => setCredentials({...credentials, email: text})}
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
                onChangeText={(text) => setCredentials({...credentials, password: text})}
              />
            </View>

            {/* Remember me and Forgot password */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                {/* Ici vous pouvez ajouter un composant Checkbox personnalisé */}
                <Text className="text-sm text-gray-700 ml-2">
                  Se souvenir de moi
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm text-blue-500">
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="w-full bg-blue-500 p-3 rounded-md"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-medium">
                Se connecter
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="mt-6">
              <Text className="text-sm text-gray-600 text-center">
                Pas encore de compte ?{' '}
                <Link href="/auth/register" className="text-blue-500 font-medium">
                  Inscrivez-vous
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
