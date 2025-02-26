import { View, Text, Image, ImageBackground } from 'react-native';
import { colors } from '@/styles/colors';
import { Link, useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../../../../assets/images/Layer-blur-bg.png')}
      style={{ flex: 1 }}
    >
      <View className="flex-col items-center justify-start mt-36 gap-4  h-full">
        <Text className="font-[NotoSans] text-xl font-bold">Sobre</Text>
        <Image
          source={require('@/assets/icon.png')}
          className="w-20 h-20 top-0"
          resizeMode="contain"
        />
        <Text className="font-[NotoSans] text-[18px] leading-[40px]">
          <Text className="font-bold">My Demo </Text>
          App
        </Text>

        <Text className="text-lg w-[70%] flex-wrap text-center">
          Um aplicativo para executar testes v1.5.0-build 188
        </Text>
        <Link
          href="https://www.linkedin.com/in/cleby-francisco-silva/"
          className="flex-row justify-center items-center "
          onPress={() => router.push(`/catalog`)}
        >
          <Text
            className="text-lg font-bold mr-3 "
            style={{ color: colors.primary[500] }}
          >
            Visite nosso site
          </Text>
        </Link>
      </View>
    </ImageBackground>
  );
}
