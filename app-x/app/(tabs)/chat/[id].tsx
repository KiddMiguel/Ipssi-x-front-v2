// app/(tabs)/chat/[id].tsx
import { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import MessageBubble from '@/components/MessageBubble';
import Global from '@/constants/Global';
import { useSelector } from 'react-redux';
import { WS_URL } from '@/constants/Config';

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface WebSocketMessage {
  type: string;
  messageId?: string;
  content?: string;
  senderId?: string;
  timestamp?: string;
  messages?: Array<{
    messageId: string;
    content: string;
    senderId: string;
    timestamp: string;
  }>;
}

interface User {
  id: string;
  username: string;
}

export default function ConversationScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  const sendMessage = (): void => {
    if (message.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'private_message',
        recipientId: id,
        content: message.trim()
      }));
      setMessage('');
    }
  };

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;

    const connectWebSocket = (): void => {
      try {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = (): void => {
          console.log('WebSocket connected');
          setConnectionError(false);
          ws.current.send(JSON.stringify({
            type: 'auth',
            userId: user.id,
            username: user.username
          }));
        };

        ws.current.onerror = (e: Event): void => {
          console.error('WebSocket error:', e);
          setConnectionError(true);
          if (reconnectAttempts < maxReconnectAttempts) {
            setTimeout(() => {
              reconnectAttempts++;
              connectWebSocket();
            }, 2000 * reconnectAttempts);
          }
        };

        ws.current.onmessage = (e: MessageEvent): void => {
          const messageData: WebSocketMessage = JSON.parse(e.data);
          switch (messageData.type) {
            case 'private_message':
              setMessages(prev => [...prev, {
                id: messageData.messageId!,
                text: messageData.content!,
                time: new Date(messageData.timestamp!).toLocaleTimeString().slice(0, 5),
                isOwn: messageData.senderId === user.id,
                status: 'delivered'
              }]);
              break;
            case 'message_history':
              setMessages(messageData.messages!.map(msg => ({
                id: msg.messageId,
                text: msg.content,
                time: new Date(msg.timestamp).toLocaleTimeString().slice(0, 5),
                isOwn: msg.senderId === user.id,
                status: 'delivered'
              })));
              break;
          }
        };

        ws.current.onclose = (): void => {
          console.log('WebSocket disconnected');
        };

      } catch (error) {
        console.error('WebSocket connection error:', error);
        setConnectionError(true);
      }
    };

    connectWebSocket();
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user.id]);

  if (connectionError) {
    return (
      <SafeAreaView style={Global.container}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">
            Impossible de se connecter au serveur de chat.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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