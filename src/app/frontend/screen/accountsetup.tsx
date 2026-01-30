import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  ScrollView, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Camera } from 'expo-camera';

const AccountSetup: React.FC = () => {
  const router = useRouter();
  const [isIdScanned, setIsIdScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Form States
  const [form, setForm] = useState({
    fullName: '', address: '', gender: '', birthdate: '',
    mothersMaiden: '', phone: '', email: '', status: '', nationality: ''
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScanID = async () => {
    if (hasPermission === null) {
      Alert.alert("Camera Permission", "Requesting camera permission...");
      return;
    }
    if (hasPermission === false) {
      Alert.alert("Permission Denied", "Camera permission is required to scan your ID. Please enable it in your device settings.");
      return;
    }
    setShowCamera(true);
    // Simulate scanning
    setTimeout(() => {
      setIsIdScanned(true);
      setShowCamera(false);
      Alert.alert("Success", "ID Scanned Successfully!");
    }, 3000); // Simulate a 3-second scan
  };

  const handleFinish = () => {
    if (!isIdScanned) {
      Alert.alert("ID Required", "You must scan your National ID to create an account.");
      return;
    }
    Alert.alert("Success", "Account Setup Complete!");
    router.replace('/'); // Go back to login
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.permissionText}>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={styles.permissionText}>No access to camera. Please change this in settings.</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={showCamera}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <Camera style={StyleSheet.absoluteFillObject} type="back">
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>Position your ID within the frame</Text>
          </View>
        </Camera>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}><Text style={styles.headerText}>MY LINYA</Text></View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Complete Your Profile</Text>

          {/* National ID Scan */}
          <TouchableOpacity 
            style={[styles.scanBox, isIdScanned && styles.scanBoxSuccess]} 
            onPress={handleScanID}
          >
            <Ionicons name={isIdScanned ? "checkmark-circle" : "scan-outline"} size={28} color={isIdScanned ? "#4CAF50" : "#FF1493"} />
            <Text style={[styles.scanText, isIdScanned && {color: '#4CAF50'}]}>
              {isIdScanned ? "ID VERIFIED" : "SCAN NATIONAL ID"}
            </Text>
          </TouchableOpacity>

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
          >
            <Text style={styles.finishBtnText}>FINISH SETUP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  header: { backgroundColor: '#2a2a2a', paddingVertical: 15, alignItems: 'center' },
  headerText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#FFE4F0', margin: 20, borderRadius: 20, padding: 20, alignItems: 'center' },
  cardTitle: { color: '#FF1493', fontWeight: 'bold', fontSize: 18, marginBottom: 20 },
  scanBox: { width: '100%', height: 60, borderRadius: 10, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FF1493', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  scanBoxSuccess: { borderColor: '#4CAF50', borderStyle: 'solid' },
  scanText: { color: '#FF1493', fontWeight: 'bold', fontSize: 12 },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#FF69B4', borderRadius: 10, padding: 12, color: '#FFF', marginBottom: 10 },
  finishBtn: { backgroundColor: '#FF1493', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  finishBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  disabledBtn: { backgroundColor: '#BDBDBD' },
  permissionText: { color: '#FFF', textAlign: 'center', marginTop: 20 },
  cameraOverlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  cameraText: { color: 'white', fontSize: 18, marginBottom: 20 }
});

export default AccountSetup;