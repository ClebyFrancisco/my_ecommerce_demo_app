import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon, Store, Menu, ShoppingCart } from 'lucide-react-native';

type NavItemProps = {
  icon: LucideIcon;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => {
  return (
    <TouchableOpacity className="items-center">
      <Icon size={24} color={'black'} />
      <Text className="font-[NotoSans] text-gray-700 text-xs mt-1">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function BottomNav() {
  return (
    <View className="absolute bottom-0 w-full bg-white border-t border-gray-300 flex-row justify-around py-4">
      <NavItem icon={Store} label="Catalogo" />
      <NavItem icon={ShoppingCart} label="Carrinho" />
      <NavItem icon={Menu} label="Menu" />
    </View>
  );
}
