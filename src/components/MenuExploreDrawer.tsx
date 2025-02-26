import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Pressable,
  Platform,
} from 'react-native';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useSession } from '@/context/AuthContext';

interface MenuExploreDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MenuExploreDrawer: React.FC<MenuExploreDrawerProps> = ({
  open,
  handleClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { session } = useSession();

  const menuItems = [
    { name: 'Adicionar ao fluxo do carrinho', path: '/', disabled: false },
    { name: 'Checkout Flow', path: '/checkout', disabled: false },
    { name: 'Log In Flow', path: '/login', disabled: false },
    { name: 'QR Code Scanner', path: '/', disabled: true },
    { name: 'Desenho', path: '/', disabled: true },
    { name: 'Reset', path: '/', disabled: true },
    { name: 'API Calls', path: '/', disabled: true },
    { name: 'Report A Bug', path: '/report', disabled: false },
    { name: 'About', path: '/about', disabled: false },
  ];

  if (session) {
    menuItems.splice(5, 0, {
      name: 'Log Out',
      path: '/logout',
      disabled: false,
    });
  }

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
    <View>
      <Modal
        transparent
        animationType="fade"
        visible={open}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View className="flex-1 justify-center relative items-center">
            <Animated.View
              style={{
                transform: [{ translateX }],
              }}
              className="bg-white w-full h-[92%] absolute left-0 top-0 p-4 rounded-r-2xl"
            >
              <View>
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Pressable
                      key={item.name}
                      className={`flex-row mb-3 -left-4 w-[90%] px-5 py-1 rounded-r-3xl`}
                      disabled={item.disabled}
                      onPress={() => {
                        router.push(item.path as `./${string}`);
                        handleClose();
                      }}
                      {...(Platform.OS === 'web'
                        ? { onMouseLeave: () => {} }
                        : {})}
                    >
                      <Text
                        className={`font-[NotoSans] text-2xl my-3 ${item.disabled ? 'text-gray-300' : 'black'}`}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MenuExploreDrawer;
