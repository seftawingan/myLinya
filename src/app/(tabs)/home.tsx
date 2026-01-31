import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const RenderSquareButton = (title, iconName, lib, color) => (
    <View style={styles.buttonUnit}>
      <TouchableOpacity style={[styles.squareButton, { backgroundColor: color }]}>
        {lib === 'Material' ? (
          <MaterialCommunityIcons name={iconName} size={32} color="white" />
        ) : (
          <FontAwesome5 name={iconName} size={28} color="white" />
        )}
      </TouchableOpacity>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER SECTION --- */}
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Welcome to myLinya!</Text>
        <TextInput
          placeholder="Search service..."
          placeholderTextColor="#555"
          value={searchQuery}
          multiline={false}
          scrollEnabled={true}
          onChangeText={setSearchQuery}
          style={[
            styles.searchBarInput,
            { fontStyle: searchQuery.length > 0 ? 'normal' : 'italic' }
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.buttonListContainer}>
        
        {/* --- HEALTH SECTION --- */}
        <Text style={styles.sectionLabel}>Health</Text>
        <View style={styles.gridWrapper}>
          {RenderSquareButton("Outpatient Consultation", "hand-holding-medical", "FA", "#36cc7a")}
          {RenderSquareButton("Service", "pills", "FA", "#36cc7a")}
          {RenderSquareButton("Service", "stethoscope", "FA", "#36cc7a")}
        </View>

        {/* --- HUMANITARIAN SECTION --- */}
        <Text style={styles.sectionLabel}>Children and Youth Welfare Program</Text>
        <View style={styles.gridWrapper}>
          {RenderSquareButton("SANGGAWADAN", "human", "Material", "#4a90e2")}
          {RenderSquareButton("Service", "utensils", "FA", "#4a90e2")}
          {RenderSquareButton("Service", "home", "FA", "#4a90e2")}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSection: {
    backgroundColor: '#f16177',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 8,
    marginTop: -70,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#f8f3f3',
    textAlign: 'center',
  },
  searchBarInput: {
    height: 48,
    width: '100%',
    backgroundColor: '#ffd1d1',
    paddingHorizontal: 20,
    paddingLeft: 50,
    borderRadius: 24,
    flex: 0,
    fontStyle: 'italic',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
    color: '#000000',
    fontSize: 16,
    marginBottom: 10,
    maxWidth: '100%',
    minWidth: '100%',
    alignSelf: 'center',
  },
  buttonListContainer: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    gap: 15,

    marginBottom: 25,
  },
  buttonUnit: {
    width: '30%', 
    alignItems: 'center',
  },
  squareButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f16177',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});