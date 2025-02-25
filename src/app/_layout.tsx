import React from 'react';
import { colors } from '@/styles/colors';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import '@/styles/global.css';
import { Loading } from '@/components/Loading';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    NotoSans: require('../../assets/fonts/NotoSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    <Loading />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
