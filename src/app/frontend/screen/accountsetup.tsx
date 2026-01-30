import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  ScrollView, Alert, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import supabase from '../../api/supabase';

export default function AccountSetup() {
  const router = useRouter();
  const [isIdScanned, setIsIdScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [form, setForm] = useState({
    fullName: '', address: '', gender: '', birthdate: '',
    mothersMaiden: '', phone: '', email: '', status: '', nationality: ''
  });

  const handleScanID = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Camera permission is required to scan your ID.");
        return;
      }
    }

    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        // Here you would typically process the image (OCR) or upload it.
        // For now, we assume the scan is successful.
        setIsIdScanned(true);
        setShowCamera(false);
        Alert.alert("Success", "ID Scanned Successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  const handleFinish = async () => {
    if (!isIdScanned) {
      Alert.alert("ID Required", "You must scan your National ID to create an account.");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        setLoading(false);
        Alert.alert("Error", "No authenticated user found. Please log in or sign up.");
        return;
    }

    // Upsert profile data
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: form.fullName,
            address: form.address,
            gender: form.gender,
            birthdate: form.birthdate,
            mothers_maiden_name: form.mothersMaiden,
            phone: form.phone,
            email: form.email || user.email,
            civil_status: form.status,
            nationality: form.nationality,
            updated_at: new Date().toISOString(),
        });
    
    setLoading(false);

    if (error) {
        Alert.alert("Error saving profile", error.message);
    } else {
        Alert.alert("Success", "Account Setup Complete!");
        router.replace('/'); 
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={showCamera}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <CameraView 
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject} 
            facing="back"
        >
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>Position your ID within the frame</Text>
            <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                <View style={styles.captureBtnInner} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeCameraBtn} onPress={() => setShowCamera(false)}>
                <Text style={styles.closeCameraText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}><Text style={styles.headerText}>MY LINYA</Text></View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Complete Your Profile</Text>

          {/* National ID Scan Status */}
          <View 
            style={[styles.scanBox, isIdScanned && styles.scanBoxSuccess]} 
          >
            <Ionicons name={isIdScanned ? "checkmark-circle" : "scan-outline"} size={28} color={isIdScanned ? "#4CAF50" : "#FF1493"} />
            <Text style={[styles.scanText, isIdScanned && {color: '#4CAF50'}]}>
              {isIdScanned ? "ID VERIFIED" : "SCAN NATIONAL ID"}
            </Text>
          </View>

          {/* Open Camera Button */}
          {!isIdScanned && (
            <TouchableOpacity style={styles.cameraBtn} onPress={handleScanID}>
              <Text style={styles.cameraBtnText}>Open Camera to Scan</Text>
            </TouchableOpacity>
          )}

          {/* Registration Fields */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, fullName: t})} />
            <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, address: t})} />
            <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, gender: t})} />
            <TextInput style={styles.input} placeholder="Birthdate" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, birthdate: t})} />
            <TextInput style={styles.input} placeholder="Mother's Maiden Name" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, mothersMaiden: t})} />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#FFF" keyboardType="phone-pad" onChangeText={(t) => setForm({...form, phone: t})} />
            <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#FFF" keyboardType="email-address" onChangeText={(t) => setForm({...form, email: t})} />
            <TextInput style={styles.input} placeholder="Civil Status" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, status: t})} />
            <TextInput style={styles.input} placeholder="Nationality / Citizenship" placeholderTextColor="#FFF" onChangeText={(t) => setForm({...form, nationality: t})} />
          </View>

          <TouchableOpacity 
            style={[styles.finishBtn, !isIdScanned && styles.disabledBtn]} 
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={styles.finishBtnText}>FINISH SETUP</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE4F0' },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  header: { backgroundColor: '#FFC1D5', paddingVertical: 15, alignItems: 'center' },
  headerText: { color: '#FF1493', fontSize: 18, fontWeight: 'bold' },
  card: { padding: 20, alignItems: 'center' },
  cardTitle: { color: '#FF1493', fontWeight: 'bold', fontSize: 18, marginBottom: 20 },
  scanBox: { width: '100%', height: 60, borderRadius: 10, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FF1493', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  scanBoxSuccess: { borderColor: '#4CAF50', borderStyle: 'solid' },
  scanText: { color: '#FF1493', fontWeight: 'bold', fontSize: 12 },
  cameraBtn: {
    backgroundColor: '#FF69B4',
    width: '80%',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#FF69B4', borderRadius: 10, padding: 12, color: '#FFF', marginBottom: 10 },
  finishBtn: { backgroundColor: '#FF1493', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  finishBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  disabledBtn: { backgroundColor: '#BDBDBD' },
  permissionText: { color: '#FFF', textAlign: 'center', marginTop: 20 },
  cameraOverlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 50 },
  cameraText: { color: 'white', fontSize: 18, marginBottom: 20 },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureBtnInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
  },
  closeCameraBtn: {
    padding: 10,
  },
  closeCameraText: {
    color: '#FFF',
    fontSize: 16,
  }
});