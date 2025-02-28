import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '@/styles/colors';
import { Link, useRouter } from 'expo-router';
import { renderStars } from '@/utils/renderStars';

interface ProductCardProps {
  image?: string;
  rating: number;
  title: string;
  price: number;
  onPress: () => void;
}

const ProductCard = ({
  image,
  rating,
  title,
  price,
  onPress,
}: ProductCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-[170] h-[314] flex flex-col overflow-hidden items-start justify-start rounded-[12px] border-2 border-gray-100  "
      onPress={() => {
        onPress();
        router.push('./catalog/product');
      }}
    >
      <View className="w-[170] h-[170] bg-white rounded-t-[12px] overflow-hidden shadow-lg">
        <Image
          source={{ uri: image }}
          className="w-[170] h-[170]  top-0"
          resizeMode="contain"
        />
      </View>
      <Text className="font-[NotoSans] text-xl font-bold px-4 py-2">
        {title}
      </Text>
      <Text className="font-[NotoSans] text-2xl font-bold px-4 py-2">
        R$ {price}
      </Text>
      <View className="flex-row ml-3 items-center justify-center">
        {renderStars(rating)}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
