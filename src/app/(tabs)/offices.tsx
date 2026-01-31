import React from 'react';
import { View, Text } from 'react-native';
import Offices from '../frontend/screen/offices';

export default function OfficesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Offices />
    </View>
  );
}