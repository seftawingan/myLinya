import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function OfficesScreen() {
  const [modalVisible, setIsModalVisible] = React.useState(false);
  const [otherModalVisible, setOtherModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Government Offices</Text>
      <Text style={styles.description}>This section contains information about various government offices in the city.</Text>
      
      {/* City Health Office Button */}
      <TouchableOpacity 
        style={styles.button1} 
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>City Health Office</Text>
      </TouchableOpacity>

      {/* City Social Welfare and Development Office Button */}
      <TouchableOpacity 
        style={styles.button2} 
        onPress={() => setOtherModalVisible(true)}
      >
        <Text style={styles.buttonText}>City Social Welfare and Development Office (CSWDO)</Text>
      </TouchableOpacity>

      {/* Modal for City Health Office */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} presentationStyle='pageSheet'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>City Health Office</Text>
            <Text style={styles.modalText}>Address: 123 Main St, Cityville</Text>
            <Text style={styles.modalText}>Contact: (123) 456-7890</Text>
            <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 10 }]}>Services:</Text>
              <Text style={styles.modalText}>  • Health consultations</Text>
              <Text style={styles.modalText}>  • Vaccinations</Text>
              <Text style={styles.modalText}>  • Health education</Text>

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for City Social Welfare and Development Office */}
      <Modal visible={otherModalVisible} animationType="slide" transparent={true} presentationStyle='pageSheet'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>City Social Welfare and Development Office (CSWDO)</Text>
            <Text style={styles.modalText}>Address: 456 Side St, Townsville</Text>
            <Text style={styles.modalText}>Contact: (987) 654-3210</Text>
            <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 10 }]}>Services:</Text>
              <Text style={styles.modalText}>  • Assistance in Crisis Situations (AICS)</Text>
              <Text style={styles.modalText}>  • Disaster Relief</Text>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setOtherModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdb8b8',
    padding: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: -14,
    marginBottom: 5,
    alignSelf: 'center',
    textAlign: 'justify',
    marginLeft: 2,
    marginRight: 2,
    width: '125%',
    paddingHorizontal: 10,
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(199, 165, 165, 0.62)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'left',
    marginLeft: 2,
    marginRight: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button1: {
    backgroundColor: '#f16177', 
    padding: 15,
    paddingLeft: 30,
    borderRadius: 10,
    width: '125%', 
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  button2: {
    backgroundColor: '#f16177', 
    padding: 15, 
    borderRadius: 10,
    width: '125%', 
    alignItems: 'flex-start',
    paddingLeft: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#f16177',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center'
  }
});