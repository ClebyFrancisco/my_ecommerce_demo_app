import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { colors } from '@/styles/colors';
import { Link, useRouter } from 'expo-router';
import { renderStars } from '@/utils/renderStars';
import { useProducts } from '@/context/ProductsContext';

interface ProductCardProps {
  id: string;
  image?: string;
  rating: number;
  title: string;
  price: number;
  onPress?: () => void;
}

const ProductCardHorizontal = ({
  id,
  image,
  rating,
  title,
  price,
  onPress,
}: ProductCardProps) => {
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const { removeFromCart } = useProducts();

  return (
    <View className="w-full flex flex-row overflow-hidden items-start justify-start rounded-[12px] border-2 border-gray-100 mt-3 ">
      <View className="w-[50%]  rounded-t-[12px] overflow-hidden shadow-lg">
        <Image
          source={{ uri: image }}
          className="w-full h-[200]  top-0"
          resizeMode="cover"
        />
      </View>
      <View className="w-[50%]">
        <Text className="font-[NotoSans] flex-wrap text-lg font-bold px-2 py-1">
          {title}
        </Text>
        <View className="flex-row px-1 py-1">{renderStars(3)}</View>
        <Text className="font-[NotoSans] text-2xl font-bold px-2 py-5">
          R$ {price}
        </Text>

        <View className="w-[90%] flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center mr-4">
            <TouchableOpacity
              disabled={amount <= 1}
              onPress={() => setAmount((prev) => Math.max(prev - 1, 1))}
            >
              <AntDesign
                name="minuscircleo"
                size={16}
                color={colors.primary[600]}
              />
            </TouchableOpacity>
            <Text className="font-bold text-xl mx-2">{amount}</Text>
            <TouchableOpacity onPress={() => setAmount((prev) => prev + 1)}>
              <AntDesign
                name="pluscircleo"
                size={16}
                color={colors.primary[600]}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={() => removeFromCart(id)}
          >
            <Text
              className="text-lg font-bold"
              style={{ color: colors.error[500] }}
            >
              Remover
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCardHorizontal;
