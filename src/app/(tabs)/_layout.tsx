import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { Loading } from '@/components/Loading';
import { colors } from '@/styles/colors';
import Header from '@/components/Header';
import React from 'react';
import BottomNav from '@/components/Nav';

export default function AppLayout() {
  const backgroundColor = colors.white;

  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor },
        }}
      />
      <BottomNav />
    </>
  );
}
