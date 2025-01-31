import { useState } from 'react';
import { View, TextInput, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import MessageBubble from '@/components/MessageBubble';
import Global from '@/constants/Global';

export default function ConversationScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Bonjour ! Comment puis-je vous aider ?', 
      time: '10:30', 
      isOwn: false, 
      status: 'read' 
    },
    { 
      id: '2', 
      text: 'Je voudrais avoir plus d\'informations sur vos services.', 
      time: '10:31', 
      isOwn: true, 
      status: 'read' 
    },
    { 
      id: '3', 
      text: 'Bien sûr, je serais ravi de vous aider !', 
      time: '10:32', 
      isOwn: false, 
      status: 'read' 
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: message,
        time: new Date().toLocaleTimeString().slice(0, 5),
        isOwn: true,
        status: 'sent'
      }]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View className="flex-row items-center py-4 px-4 border-b border-gray-200">
        <Feather 
          name="chevron-left" 
          size={24} 
          color="black" 
          onPress={() => router.back()} 
        />
        <Text className="text-lg font-semibold ml-4">{name}</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <MessageBubble
              message={item.text}
              time={item.time}
              isOwn={item.isOwn}
              status={item.status}
            />
          )}
        />

        <View className="border-t border-gray-200 p-4 flex-row items-center space-x-4 bg-white">
          <View className="flex-1 bg-gray-100 rounded-full flex-row items-center px-4 py-2">
            <TextInput
              className="flex-1 text-base"
              placeholder="Message"
              value={message}
              onChangeText={setMessage}
              multiline
              maxHeight={100}
            />
          </View>
          <Feather
            name="send"
            size={24}
            color={message.trim() ? '#3b82f6' : '#9ca3af'}
            onPress={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
