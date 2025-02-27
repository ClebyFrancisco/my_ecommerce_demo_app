import {
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Pressable,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/colors';

interface FilterModalProps {
  open: boolean;
  handleClose: () => void;
  applyFilter: (filters: { search: string; sort: string }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  handleClose,
  applyFilter,
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const translateX = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <ImageBackground
          source={require('../../assets/images/Layer-blur-bg.png')}
          className="flex-1 justify-center items-center"
        >
          <Animated.View
            style={{ transform: [{ translateX }] }}
            className="bg-white w-full h-[40%] absolute right-0 top-0 p-4 rounded-r-2xl"
          >
            <Text className="text-xl font-bold mb-3">Filtrar Produtos</Text>

            <TextInput
              className="border p-2 mb-3 rounded"
              placeholder="Buscar produto..."
              value={search}
              onChangeText={setSearch}
            />

            <Pressable
              className={`p-2 mb-2 rounded ${sort === 'recent' ? 'border-l-4 border-blue-500 ' : 'bg-gray-200'}`}
              onPress={() => setSort('recent')}
            >
              <Text
                className={`${sort === 'recent' && 'text-blue-500 '} text-center`}
              >
                Mais Recentes
              </Text>
            </Pressable>
            <Pressable
              className={`p-2 mb-2 rounded ${sort === 'low-to-high' ? 'border-l-4 border-blue-500 ' : 'bg-gray-200'}`}
              onPress={() => setSort('low-to-high')}
            >
              <Text
                className={`${sort === 'low-to-high' && 'text-blue-500 '} text-center`}
              >
                Menor Preço
              </Text>
            </Pressable>
            <Pressable
              className={`p-2 mb-2 rounded ${sort === 'high-to-low' ? 'border-l-4 border-blue-500 ' : 'bg-gray-200'}`}
              onPress={() => setSort('high-to-low')}
            >
              <Text
                className={`${sort === 'high-to-low' && 'text-blue-500 '} text-center`}
              >
                Maior Preço
              </Text>
            </Pressable>

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
                onPress={() => {
                  applyFilter({ search, sort });
                  handleClose();
                }}
              >
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.black }}
                >
                  Aplicar Filtro
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
