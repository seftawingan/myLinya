import React, { useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';
import Calendar from '../components/calendar';

type SelectedDateInfo = {
    date: string;
    queueCount: number;
};

const SchedulingScreen: React.FC = () => {
    const [selectedInfo, setSelectedInfo] = useState<SelectedDateInfo | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <LinearGradient
            colors={['#ca7c99', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, padding: 16 }}
        >

            {/*Calendar with marked dates*/}
            <Calendar
                onDateSelect={setSelectedInfo}
                selectedDate={selectedInfo?.date}
            />

            {/* Dynamic queue text & Proceed button */}
            {selectedInfo && (
                <>
                    <Text style={{ marginTop: 16, fontSize: 16 }}>
                        There are {selectedInfo.queueCount} people in the queue on {selectedInfo.date}.
                    </Text>
                    <Button
                        title="PROCEED"
                        onPress={() => setShowConfirm(true)}
                    />
                </>
            )}

            {/* Confirmation modal */}
            <Modal transparent visible={showConfirm} animationType="fade">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(180, 73, 100, 0.7)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 8,
                            width: '80%',
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 12 }}>
                            Your appointment will be on {selectedInfo?.date}. Do you wish to proceed?
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="YES" onPress={() => setShowConfirm(false)} />
                            <Button title="NO" onPress={() => setShowConfirm(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};


export default SchedulingScreen;