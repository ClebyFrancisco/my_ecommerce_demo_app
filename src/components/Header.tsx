import { colors } from '@/styles/colors';
import { Text, View } from 'react-native';

const Header = () => {
  return (
    <View
      style={{ backgroundColor: colors.white }}
      className="px-4 py-3 -z-50 h-24 flex items-center justify-end border-b border-b-gray-300"
    >
      <View className="flex-row justify-center items-center w-[80%]">
        <Text className="font-[NotoSans] text-[18px] leading-[40px]">
          <Text className="font-bold">My Demo </Text>
          App
        </Text>
      </View>
    </View>
  );
};

export default Header;
