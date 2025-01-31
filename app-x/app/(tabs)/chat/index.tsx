import { View, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ChatListItem from '@/components/ChatListItem';

export default function ChatScreen() {
  const chats = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Salut, comment ça va ?',
      time: '10:30',
      unread: 2,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Alice Smith',
      avatar: 'https://i.pravatar.cc/150?img=2', // Optionnel
      lastMessage: 'Le projet avance bien !',
      time: '09:15',
      unread: 0,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Team X Project',
      lastMessage: 'Réunion à 14h 👍',
      time: 'Hier',
      unread: 5,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      lastMessage: 'Merci pour ton aide !',
      time: 'Hier',
      unread: 0,
      isOnline: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
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
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatListItem {...item} />}
        className="flex-1"
      />
    </SafeAreaView>
  );
}
