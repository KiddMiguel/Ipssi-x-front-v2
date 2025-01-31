import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          className="px-4 py-6"
        >
          <View className="bg-white rounded-2xl shadow-sm p-6 mx-2">
            <View className="items-center mb-6">
              <Feather name="twitter" size={40} color="#3b82f6" />
            </View>
            
            <Text className="text-xl font-bold text-center mb-6">
              Connectez-vous à X
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <TextInput
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white text-base"
                  placeholder="nom@exemple.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={credentials.email}
                  onChangeText={(text) => setCredentials({...credentials, email: text})}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </Text>
                <TextInput
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white text-base"
                  placeholder="Votre mot de passe"
                  secureTextEntry
                  value={credentials.password}
                  onChangeText={(text) => setCredentials({...credentials, password: text})}
                />
              </View>

              <View className="flex-row justify-between items-center py-2">
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-sm text-gray-700">
                    Se souvenir de moi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-500 font-medium">
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="w-full bg-blue-500 p-4 rounded-xl mt-4"
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-base">
                  Se connecter
                </Text>
              </TouchableOpacity>

              <View className="mt-6">
                <Text className="text-sm text-gray-600 text-center">
                  Pas encore de compte ?{' '}
                  <Link href="/auth/register" className="text-blue-500 font-bold">
                    Inscrivez-vous
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
