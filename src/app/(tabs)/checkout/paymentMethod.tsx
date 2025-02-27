import { colors } from '@/styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PaymentMethod() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  return (
    <View className="px-3">
      <Text className="font-[NotoSans] font-bold text-3xl my-4">Checkout</Text>
      <Text className="font-[NotoSans] font-bold text-xl">
        Enter a payment method
      </Text>
      <Text
        className="w-full flex-wrap text-xl"
        style={{ color: colors.gray[600] }}
      >
        You will not be charged until you review your purchase on the next
        screen.
      </Text>
      <View className="flex-row items-center justify-between  mt-5">
        <Text className="font-[NotoSans] font-bold text-xl">Card</Text>

        <FontAwesome name="credit-card" size={24} color={colors.gray[300]} />
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
          placeholder="Full Name On Card *"
          value={name}
          onChangeText={setName}
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
          placeholder="Card Number *"
          value={number}
          inputMode="numeric"
          onChangeText={setNumber}
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
            placeholder="Expiration DATE *"
            value={expirationDate}
            maxLength={5}
            inputMode="numeric"
            onChangeText={(text) => {
              let formattedText = text.replace(/\D/g, '');
              if (formattedText.length > 2) {
                formattedText =
                  formattedText.slice(0, 2) + '/' + formattedText.slice(2, 4);
              }
              setExpirationDate(formattedText);
            }}
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
            placeholder="Security Code *"
            maxLength={3}
            inputMode="numeric"
            value={code}
            onChangeText={setCode}
          />
        </View>
      </View>
      <View></View>

      <TouchableOpacity
        onPress={() => router.push('/checkout/checkoutCompleted')}
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
            Comprar Agora
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
