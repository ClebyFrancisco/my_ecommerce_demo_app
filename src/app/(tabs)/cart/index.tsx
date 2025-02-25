import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../../../assets/images/Layer-blur-bg.png')}
      style={{ flex: 1 }}
    >
      <View className="flex-col items-center justify-center gap-4  h-full">
        <Image
          source={require('@/assets/cart-inactive-icon.png')}
          className="w-[100] h-[100}  top-0"
          resizeMode="contain"
        />
        <Text className="font-[NotoSans] text-xl font-bold">Nenhum item</Text>
        <Text className="text-lg">
          Oh não! Seu carrinho está vazio. Preencha-o com brindes para concluir
          sua compra.
        </Text>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.secondary[500], colors.primary[500]]}
          style={{
            borderRadius: 25,
            width: '50%',
            paddingVertical: 16,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            className="flex-row justify-center items-center "
            onPress={() => router.push(`/catalog`)}
          >
            <Text
              className="text-lg font-bold mr-3 "
              style={{ color: colors.gray[100] }}
            >
              Go shopping
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}
