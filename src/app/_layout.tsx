import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import '@/styles/global.css';
import { Loading } from '@/components/Loading';
import { ProductsProvider } from '@/context/ProductsContext';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    NotoSans: require('../../assets/fonts/NotoSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    <Loading />;
  }
  return (
    <ProductsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProductsProvider>
  );
}
