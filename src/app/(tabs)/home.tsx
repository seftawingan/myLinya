import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  { id: '1', title: 'Apple' },
  { id: '2', title: 'Banana' },
  { id: '3', title: 'Orange' },
  { id: '4', title: 'Mango' },
  { id: '5', title: 'Grapes' },
];

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerSection}>
                <Text style={styles.welcomeText}>Welcome to myLinya!</Text>
                <TextInput
                    placeholder="Search service..."
                    placeholderTextColor="#555"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBarInput}
                />
            </View>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                style={styles.list}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#ff9eadb2',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  searchBarInput: {
    height: 48,
    width: '100%',
    backgroundColor: '#ffd1d1',
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontSize: 18,
  },
});
