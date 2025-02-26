import { useSession } from '@/context/AuthContext';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { checkout } = useLocalSearchParams();

  const { signIn } = useSession();

  const handleSignIn = async () => {
    try {
      const isSignIn = await signIn(email, password);

      if (isSignIn) {
        if (checkout) {
          router.push('/checkout');
        } else {
          router.push('/catalog');
        }
      }
    } catch (error) {
      alert();
    }
  };
  return (
    <View className="flex-1 p-5">
      <Text className="font-[NotoSans] font-bold text-3xl my-4">Login</Text>

      <Text
        className="w-full flex-wrap text-xl"
        style={{ color: colors.gray[600] }}
      >
        Selecione um nome de usuário e uma senha na lista abaixo ou clique no
        nome de usuário para preencher automaticamente o nome de usuário e a
        senha.
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
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View
        className="w-full flex-row items-center mb-5 px-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
        }}
      >
        <TextInput
          className="flex-1 h-14"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleSignIn}>
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
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View
        className="w-full mt-8 p-5 rounded-lg"
        style={{ backgroundColor: colors.gray[100] }}
      >
        <Text className="text-lg font-bold">Nomes de usuário aceitos:</Text>
        <TouchableOpacity>
          <Text>bob@example.com</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>alice@example.com</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Senha para todos os usuários:</Text>
        <Text>10203040</Text>
      </View>
    </View>
  );
}
