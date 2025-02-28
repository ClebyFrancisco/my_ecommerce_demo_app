import api from '@/services/api';
import { colors } from '@/styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PaymentMethod() {
  const router = useRouter();
  const { order } = useLocalSearchParams();

  const [paymentData, setPaymentData] = useState({
    name: '',
    number: '',
    code: '',
    expirationDate: '',
  });

  const handleChange = (field: keyof typeof paymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreatePayment = async () => {
    const { name, number, code, expirationDate } = paymentData;

    if (![name, number, code, expirationDate].every((field) => field.trim())) {
      return;
    }

    try {
      const response = await api.post(`/payments/${order}`, {
        method: 'CARD',
      });
      if (response.status === 201) {
        router.push('/checkout/checkoutCompleted');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  };
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
          value={paymentData.name}
          onChangeText={(text) => handleChange('name', text)}
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
          value={paymentData.number}
          inputMode="numeric"
          onChangeText={(text) => handleChange('number', text)}
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
            value={paymentData.expirationDate}
            maxLength={5}
            inputMode="numeric"
            onChangeText={(text) => {
              let formattedText = text.replace(/\D/g, '');
              if (formattedText.length > 2) {
                formattedText =
                  formattedText.slice(0, 2) + '/' + formattedText.slice(2, 4);
              }

              handleChange('expirationDate', formattedText);
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
            value={paymentData.code}
            onChangeText={(text) => handleChange('code', text)}
          />
        </View>
      </View>
      <View></View>

      <TouchableOpacity onPress={handleCreatePayment}>
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
