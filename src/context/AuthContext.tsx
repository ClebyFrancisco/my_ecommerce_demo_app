import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import { useRouter } from 'expo-router';
import {
  useStorageStateSession,
  useStorageStateLoading,
} from '@/storage/useStorageState';
import api from '@/services/api';

type addres = {
  name?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userAddressShipping: addres | null;
  setUserAddresShipping: React.Dispatch<React.SetStateAction<addres | null>>;
}>({
  signIn: async () => false,
  signOut: () => null,
  session: null,
  isLoading: false,
  userAddressShipping: null,
  setUserAddresShipping: () => {},
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useStorageStateSession('session');
  const [userAddressShipping, setUserAddresShipping] = useState<addres | null>(
    null,
  );
  const [isLoading, setIsLoading] = useStorageStateLoading();
  const router = useRouter();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            setIsLoading(true);
            const response = await api.post('/auth/login', { email, password });

            setSession(response.data.access_token);
            return true;
          } catch (error) {
            setSession(null);
            return false;
          } finally {
            setIsLoading(false);
          }
        },

        signOut: () => {
          setSession(null);
          setUserAddresShipping(null);
          router.replace('/login');
        },
        session,
        userAddressShipping,
        setUserAddresShipping,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
