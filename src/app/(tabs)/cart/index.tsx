import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useProducts } from '@/context/ProductsContext';
import EmptyCart from './emptyCart';
import ProductCardHorizontal from '@/components/productCardHorizontal';
import { useSession } from '@/context/AuthContext';

export default function CartScreen() {
  const router = useRouter();
  const { cart } = useProducts();
  const { session } = useSession();

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const goToCheckout = () => {
    if (session) {
      router.push('/checkout');
    } else {
      router.push({ pathname: '/login', params: { checkout: 'true' } });
    }
  };

  return (
    <View className="flex-1">
      {totalItems > 0 ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 80,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="font-[NotoSans] font-bold text-3xl my-4">
            My Cart
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

          <View className="mt-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg">
                Total: {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </Text>
              <Text className="font-bold text-lg">R$ {totalPrice}</Text>
            </View>

            <TouchableOpacity onPress={goToCheckout}>
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
                  Ir para Checkout
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <EmptyCart />
      )}
    </View>
  );
}
