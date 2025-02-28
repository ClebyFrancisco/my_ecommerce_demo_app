import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import { useProducts } from '@/context/ProductsContext';
import ProductCardHorizontal from '@/components/productCardHorizontal';
import { FontAwesome } from '@expo/vector-icons';
import { useSession } from '@/context/AuthContext';
import api from '@/services/api';
import { useEffect, useState, useCallback } from 'react';
import { Loading } from '@/components/Loading';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart } = useProducts();
  const { session, userAddressShipping, setUserAddresShipping } = useSession();

  const [loading, setLoading] = useState(false);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const fetchData = async () => {
    if (!session || userAddressShipping) return;

    setLoading(true);

    try {
      const response = await api.get('/address', {
        headers: { Authorization: `Bearer ${session}` },
      });

      if (response.status === 200) {
        setUserAddresShipping(response.data);
      }
    } catch (error) {
      router.push('/checkout/shippingAddress');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [session]),
  );

  const handleCreateOrder = async () => {
    const response = await api.post(
      '/orders',
      {},
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );
    router.push({
      pathname: '/checkout/paymentMethod',
      params: { order: response.data.id },
    });
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-[NotoSans] font-bold text-3xl my-4">
          Checkout
        </Text>

        <Text className="font-[NotoSans] font-bold text-xl">
          Revise seu pedido
        </Text>

        {cart.map((item) => (
          <ProductCardHorizontal
            id={item.id}
            key={item.id}
            image={item.imageUrl}
            title={item.name}
            rating={3}
            price={item.price}
          />
        ))}

        <View className="flex-row items-center justify-between">
          <Text className="font-[NotoSans] font-bold text-xl">
            Endereço de entrega
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/checkout/shippingAddress')}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loading color="red" />
        ) : userAddressShipping ? (
          <View>
            <Text>{userAddressShipping.name}</Text>
            <Text>
              {userAddressShipping.addressLine1},{' '}
              {userAddressShipping.addressLine2}
            </Text>
            <Text>
              {userAddressShipping.city}, {userAddressShipping.zipCode}
            </Text>
            <Text>
              {userAddressShipping.state}, {userAddressShipping.country}
            </Text>
          </View>
        ) : (
          <Text>Endereço não encontrado</Text>
        )}

        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg">
              Total: {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </Text>
            <Text className="font-bold text-lg">R$ {totalPrice}</Text>
          </View>

          <TouchableOpacity onPress={handleCreateOrder}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={[colors.secondary[500], colors.primary[500]]}
              style={{
                borderRadius: 25,
                width: '100%',
                paddingVertical: 16,
                alignItems: 'center',
              }}
            >
              <Text
                className="text-lg font-bold"
                style={{ color: colors.gray[100] }}
              >
                Fazer pedido
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
