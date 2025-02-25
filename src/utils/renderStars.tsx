import { colors } from '@/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export const renderStars = (rating: number) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <View
        key={i}
        className="mr-2  w-6 h-6 rounded-[50%] flex items-center justify-center p-0"
        style={{
          backgroundColor: i < rating ? colors.warning[500] : colors.gray[300],
        }}
      >
        <MaterialIcons name="star" size={14} color="white" />
      </View>,
    );
  }
  return stars;
};
