import { View, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from '@/components/productCard';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/Loading';
import { colors } from '@/styles/colors';
import { useProducts } from '@/context/ProductsContext';
import { useRouter } from 'expo-router';

type IProductsProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function CatalogScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductsProps[] | []>([]);

  const { setSelectedProduct } = useProducts();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {});

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 p-5">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-2xl font-[NotoSans] font-bold">Produtos</Text>
        <Ionicons name="filter" size={24} color={colors.black} />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {!loading ? (
          <View className="flex-row flex-wrap justify-start gap-1">
            {products &&
              products.map((item) => {
                return (
                  <ProductCard
                    onPress={() => {
                      router.push('/cart');
                      setSelectedProduct(item);
                    }}
                    key={item.id}
                    image={item.imageUrl}
                    title={item.name}
                    rating={3}
                    price={item.price}
                  />
                );
              })}
          </View>
        ) : (
          <View className="h-full w-full items-center justify-center">
            <Loading color={colors.black} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
