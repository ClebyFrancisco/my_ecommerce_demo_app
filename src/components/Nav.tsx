import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { colors } from '@/styles/colors';
import { useProducts } from '@/context/ProductsContext';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

type NavItemProps = {
  icon: MaterialIconName;
  label: string;
  isActive: boolean;
  onPress: () => void;
  amount_cart?: number;
};

const NavItem = ({
  icon,
  label,
  isActive,
  onPress,
  amount_cart,
}: NavItemProps) => {
  return (
    <TouchableOpacity className="items-center relative" onPress={onPress}>
      {amount_cart && (
        <View className="top-3 -right-2 z-50 ml-3 w-4 h-4 bg-red-500 rounded-[50%] flex items-center justify-center">
          <Text className="text-white text-xs text-center">{amount_cart}</Text>
        </View>
      )}
      <MaterialIcons
        name={icon}
        size={24}
        color={isActive ? colors.secondary[400] : 'black'}
      />

      <Text className="font-[NotoSans] text-gray-700 text-xs mt-1">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useProducts();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View className="absolute bottom-0 w-full bg-white border-t border-gray-300 flex-row justify-around py-4">
      <NavItem
        icon="store"
        label="Catalogo"
        isActive={(pathname == '/catalog' || pathname == '/') && !menuOpen}
        onPress={() => {
          router.push(`/catalog`);
          setMenuOpen(false);
        }}
      />
      <NavItem
        icon="shopping-cart"
        label="Carrinho"
        isActive={pathname == '/cart' && !menuOpen}
        amount_cart={cart.length > 0 ? cart.length : 0}
        onPress={() => {
          router.push(`/cart`);
          setMenuOpen(false);
        }}
      />
      <NavItem
        icon="menu"
        label="Menu"
        isActive={menuOpen}
        onPress={() => {
          setMenuOpen(true);
        }}
      />
    </View>
  );
}
