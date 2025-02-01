import { View, Text, Image } from "react-native";

type UserAvatarProps = {
  name: string;
  size?: number;
  imageUrl?: string;
};

const getInitials = (name: string) => {
  return name
    .split("")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 1);
};

const getRandomColor = (name: string) => {
  const colors = ["bg-blue-500"];
  const index = name.length % colors.length;
  return colors[index];
};

export default function UserAvatar({ name, size = 56 }: UserAvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(name);

  return (
    <View
      className={`rounded-full items-center justify-center ${backgroundColor}`}
      style={{ width: size, height: size }}
    >
      <Text className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
        {initials}
      </Text>
    </View>
  );
}
