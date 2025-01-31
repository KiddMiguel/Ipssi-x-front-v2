import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import '../../global.css';
import Global from '@/constants/Global';

export default function RegisterScreen() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();

  const handleRegister = () => {
    console.log('Register attempt:', credentials);
  };

  return (
    <SafeAreaView style={[Global.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <View className="items-center mb-8">
            <Feather name="twitter" size={32} color="#3b82f6" />
          </View>

          <Text className="text-2xl font-bold text-center mb-8">
            Créez votre compte
          </Text>

          {/* Formulaire */}
          <View className="space-y-6">
            {/* Nom */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Nom
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="Votre nom"
                value={credentials.name}
                onChangeText={(text) => setCredentials({...credentials, name: text})}
              />
            </View>

            {/* Email */}
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

            {/* Mot de passe */}
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

            {/* Confirmer le mot de passe */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="••••••••"
                secureTextEntry
                value={credentials.confirmPassword}
                onChangeText={(text) => setCredentials({...credentials, confirmPassword: text})}
              />
            </View>

            {/* Bouton Inscription */}
            <TouchableOpacity
              className="w-full bg-blue-500 p-3 rounded-md mt-4"
              onPress={handleRegister}
            >
              <Text className="text-white text-center font-medium">
                S'inscrire
              </Text>
            </TouchableOpacity>

            {/* Lien vers connexion */}
            <View className="mt-6">
              <Text className="text-sm text-gray-600 text-center">
                Vous avez déjà un compte ?{' '}
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
