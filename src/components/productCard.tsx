import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '@/styles/colors';
import { Link, useRouter } from 'expo-router';

interface ProductCardProps {
  image?: string;
  rating: number;
  title: string;
  price: number;
}

const ProductCard = ({ image, rating, title, price }: ProductCardProps) => {
  const router = useRouter();
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <View
          key={i}
          className="mr-2  w-6 h-6 rounded-[50%] flex items-center justify-center p-0"
          style={{
            backgroundColor:
              i < rating ? colors.warning[500] : colors.gray[300],
          }}
        >
          <MaterialIcons name="star" size={14} color="white" />
        </View>,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      className="w-[170] h-[314] flex flex-col overflow-hidden items-start justify-start rounded-[12px] border-2 border-gray-100  "
      onPress={() => router.push('./catalog/product')}
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
