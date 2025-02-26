import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export default function LogoutScreen() {
  const router = useRouter();
  const { signOut } = useSession();
  return (
    <ImageBackground
      source={require('../../../../assets/images/Layer-blur-bg.png')}
      style={{ flex: 1 }}
    >
      <View className="flex-col items-center justify-start mt-36 gap-4  h-full">
        <Text className="font-[NotoSans] text-xl font-bold">Log out</Text>
        <Image
          source={require('@/assets/icon.png')}
          className="w-20 h-20 top-0"
          resizeMode="contain"
        />

        <Text className="text-lg w-[70%] flex-wrap text-center">
          Tem certeza de que deseja sair da sua conta?
        </Text>
        <TouchableOpacity
          className="w-[50%]"
          onPress={() => {
            signOut();
            router.push('/login');
          }}
        >
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
              Sair
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
