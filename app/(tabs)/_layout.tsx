
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'globe',
      label: 'Projets',
    },
    {
      name: 'cotchat',
      route: '/(tabs)/cotchat',
      icon: 'message.fill',
      label: 'CoTchat',
    },
    {
      name: 'deals',
      route: '/(tabs)/deals',
      icon: 'lightbulb.fill',
      label: 'Bons Plans',
    },
    {
      name: 'create',
      route: '/(tabs)/create',
      icon: 'plus.circle.fill',
      label: 'Créer',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profil',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="globe" drawable="ic_home" />
          <Label>Projets</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="cotchat">
          <Icon sf="message.fill" drawable="ic_chat" />
          <Label>CoTchat</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="deals">
          <Icon sf="lightbulb.fill" drawable="ic_deals" />
          <Label>Bons Plans</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="create">
          <Icon sf="plus.circle.fill" drawable="ic_create" />
          <Label>Créer</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="cotchat" />
        <Stack.Screen name="deals" />
        <Stack.Screen name="create" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
