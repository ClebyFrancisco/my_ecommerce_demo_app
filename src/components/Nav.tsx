import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { colors } from '@/styles/colors';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

type NavItemProps = {
  icon: MaterialIconName;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const NavItem = ({ icon, label, isActive, onPress }: NavItemProps) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
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
