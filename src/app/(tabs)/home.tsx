import React from 'react';
import { View, Text } from 'react-native';
import Home from '../frontend/screen/home';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Home />
    </View>
  );
}