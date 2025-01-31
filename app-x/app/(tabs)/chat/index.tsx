import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
            <Text className="text-xl font-bold text-gray-800">
            Chat
          </Text>
            </View>
        </SafeAreaView>
  );
}
