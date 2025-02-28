import { useSession } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductsContext';
import api from '@/services/api';
import { colors } from '@/styles/colors';
import { renderStars } from '@/utils/renderStars';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ProductScreen() {
  const { selectedProduct, setCart, cart } = useProducts();
  const router = useRouter();
  const { session, userAddressShipping, setUserAddresShipping } = useSession();

  const [amount, setAmount] = useState(1);

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    const isProductInCart = cart?.some(
      (product) => product.id === selectedProduct.id,
    );
    if (isProductInCart) {
      router.push('/cart');
      return;
    }

    try {
      if (session) {
        const response = await api.post(
          '/carts',
          {},
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          },
        );

        const cardId = response.data.id;

        await api.post('/cart-items', {
          cartId: cardId,
          productId: selectedProduct.id,
          quantity: amount,
        });

        const responseData = await api.get(`/carts/${cardId}`);

        const products = responseData.data.items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
          rating: item.product.rating,
        }));

        setCart(products);
      } else {
        setCart((prev) => {
          const isProductInCart = prev?.some(
            (product) => product.id === selectedProduct.id,
          );
          if (isProductInCart) return prev;

          return prev ? [...prev, selectedProduct] : [selectedProduct];
        });
      }

      router.push('/cart');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="font=[NotoSans] font-bold text-3xl">
        {selectedProduct?.name}
      </Text>
      <View className="flex-row">{renderStars(3)}</View>
      <View className="mt-3 rounded-[12px] overflow-hidden shadow-lg">
        <Image
          source={{ uri: selectedProduct?.imageUrl }}
          className="w-full h-[360] top-0"
          resizeMode="cover"
        />
      </View>
      <View className="mt-2 flex-row items-center justify-start">
        <Text>Cor: </Text>
        <View className="ml-3 w-5 h-5 bg-black rounded-[50%]"></View>
        <View className="ml-3 w-5 h-5 bg-gray-500 rounded-[50%]"></View>
        <View className="ml-3 w-5 h-5 bg-red-500 rounded-[50%]"></View>
      </View>
      <Text className="font-[NotoSans] text-3xl font-bold py-2 mt-3">
        R$ {selectedProduct?.price}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity
            disabled={amount <= 1}
            onPress={() => setAmount((prev) => Math.max(prev - 1, 1))}
          >
            <AntDesign
              name="minuscircleo"
              size={18}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
          <Text className="font-bold text-xl mx-3">{amount}</Text>
          <TouchableOpacity onPress={() => setAmount((prev) => prev + 1)}>
            <AntDesign
              name="pluscircleo"
              size={18}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.secondary[500], colors.primary[500]]}
          style={{
            borderRadius: 25,
            paddingVertical: 16,
            paddingHorizontal: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={handleAddToCart}
          >
            <Text className="text-lg font-bold" style={{ color: colors.black }}>
              Adicionar no Carrinho
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}
