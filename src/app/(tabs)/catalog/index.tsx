import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from '@/components/productCard';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/Loading';
import { colors } from '@/styles/colors';
import { useProducts } from '@/context/ProductsContext';
import { useRouter } from 'expo-router';
import FilterModal from '@/components/filterProducts';

type IProductsProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  updatedAt: string;
  rating: number;
};

export default function CatalogScreen() {
  const router = useRouter();
  const { setSelectedProduct } = useProducts();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductsProps[] | []>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const applyFilter = (filters: { search: string; sort: string }) => {
    let filteredProducts = [...products];

    if (filters.search) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.sort === 'low-to-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'high-to-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'recent') {
      filteredProducts.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }

    setProducts(filteredProducts);
  };

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
    <View className="flex-1 p-5 relative">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-2xl font-[NotoSans] font-bold">Produtos</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={24} color={colors.black} />
        </TouchableOpacity>
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
                    rating={item.rating}
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
      <FilterModal
        open={filterModalVisible}
        handleClose={() => setFilterModalVisible(false)}
        applyFilter={applyFilter}
      />
    </View>
  );
}
