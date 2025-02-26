import { View, Text, Image, ImageBackground } from 'react-native';
import { colors } from '@/styles/colors';
import { Link, useRouter } from 'expo-router';

export default function ReportScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../../../../assets/images/Layer-blur-bg.png')}
      style={{ flex: 1 }}
    >
      <View className="flex-col items-center justify-start mt-36 gap-4  h-full">
        <Text className="font-[NotoSans] text-xl font-bold">Report a bug</Text>
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
          Entre em contato com nosso suporte técnico de atendimento ao cliente
          pelo e-mail abaixo:
        </Text>
        <Link
          href="mailto:stc@test.com"
          className="flex-row justify-center items-center "
          onPress={() => router.push(`/catalog`)}
        >
          <Text
            className="text-lg font-bold mr-3 "
            style={{ color: colors.primary[500] }}
          >
            stc@test.com
          </Text>
        </Link>
      </View>
    </ImageBackground>
  );
}
