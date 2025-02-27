import { useSession } from '@/context/AuthContext';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ShippingAddress() {
  const router = useRouter();
  const { userAddressShipping, setUserAddresShipping } = useSession();

  const [name, setName] = useState(userAddressShipping?.name);
  const [address1, setAddress1] = useState(userAddressShipping?.addressLine1);
  const [address2, setAddress2] = useState(userAddressShipping?.addressLine2);
  const [city, setCity] = useState(userAddressShipping?.city);
  const [state, setState] = useState(userAddressShipping?.state);
  const [zipCode, setZipCode] = useState(userAddressShipping?.zipCode);
  const [country, setCountry] = useState(userAddressShipping?.country);

  const handleNewAddress = () => {
    setUserAddresShipping({
      name,
      addressLine1: `${address1}`,
      addressLine2: `${address2}`,
      city: `${city}`,
      state: `${state}`,
      zipCode: `${zipCode}`,
      country: `${city}`,
    });
  };
  return (
    <View className="px-3">
      <Text className="font-[NotoSans] font-bold text-3xl my-4">Checkout</Text>
      <Text className="font-[NotoSans] font-bold text-xl">
        Revise seu pedido
      </Text>
      <View
        className="w-full flex-row items-center mt-9 my-5 px-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
        }}
      >
        <TextInput
          className="flex-1 h-14"
          placeholder="FULL NAME *"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View
        className="w-full flex-row items-center  mt-9 my-5 px-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
        }}
      >
        <TextInput
          className="flex-1 h-14"
          placeholder="ADDRES LINE 1*"
          value={address1}
          onChangeText={setAddress1}
        />
      </View>
      <View
        className="w-full flex-row items-center mt-9 my-5 px-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
        }}
      >
        <TextInput
          className="flex-1 h-14"
          placeholder="ADDRES LINE 2"
          value={address2}
          onChangeText={setAddress2}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <View
          className="w-[45%] flex-row items-center mt-9 my-5 px-4"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          }}
        >
          <TextInput
            className="flex-1 h-14"
            placeholder="CITY *"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View
          className="w-[45%] flex-row items-center mt-9 my-5 px-4"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          }}
        >
          <TextInput
            className="flex-1 h-14"
            placeholder="STATE / REGION"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View
          className="w-[45%] flex-row items-center mt-9 my-5 px-4"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          }}
        >
          <TextInput
            className="flex-1 h-14"
            placeholder="ZIP CODE  *"
            value={zipCode}
            onChangeText={setZipCode}
          />
        </View>
        <View
          className="w-[45%] flex-row items-center mt-9 my-5 px-4"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          }}
        >
          <TextInput
            className="flex-1 h-14"
            placeholder="COUNTRY *"
            value={country}
            onChangeText={setCountry}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleNewAddress();
          router.push('/checkout');
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.secondary[500], colors.primary[500]]}
          style={{
            borderRadius: 25,
            width: '100%',
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text
            className="text-lg font-bold"
            style={{ color: colors.gray[100] }}
          >
            Continuar
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
