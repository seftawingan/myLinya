import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from '@rneui/base';

type QueueInfo = {
    date: string;
    queueNumber: number;
    appointmentTime: string; // 
    circleColor?: string; // 
};

const QueueScreen: React.FC<{ queueInfo: QueueInfo }> = ({ queueInfo }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    //Formatted appointment date and time
    const appointmentDateTime = new Date(`${queueInfo.date}T${queueInfo.appointmentTime}`);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(appointmentDateTime);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(appointmentDateTime);

    // Countdown
    useEffect(() => {
        let secondsLeft = Math.max(
            Math.floor((appointmentDateTime.getTime() - new Date().getTime()) / 1000),
            0
        );
        setTimeLeft(secondsLeft);

        const interval = setInterval(() => {
            secondsLeft -= 1;
            setTimeLeft(Math.max(secondsLeft, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [appointmentDateTime]);

    // Format seconds to HH:MM:SS
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel your appointment?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', style: 'destructive', onPress: () => console.log('Appointment cancelled') },
            ]
        );
    };

    return (
        <View className="flex-1 bg-white px-6 pt-10">
            {/* Title */}
            <Text className="text-4xl font-bold text-center text-pink-700 mb-1">
                Free Medical Consultation
            </Text>
            <Text className="text-xl font-bold text-center text-pink-700 mb-2">
                City Health Office
            </Text>

            {/* Queue Number */}
            <View className="items-center my-10">
                <View
                    style={{
                        width: 192,
                        height: 192,
                        borderRadius: 96,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: queueInfo.circleColor || '#fb7185',
                        shadowColor: '#000',
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 90, fontWeight: 'bold' }}>
                        {queueInfo.queueNumber}
                    </Text>

                    <Text className="font-bold text-white text-l mt-2 tracking-wide">
                        QUEUE NUMBER
                    </Text>
                </View>
            </View>

            {/* Appointment Details Card */}
            <View className="bg-pink-100 rounded-2xl p-3 mb-15 shadow-sm">
                <Text className="text-lg text-center font-semibold text-pink-800 mb-2">
                    We will see you on
                </Text>
                <View className="items-center">
                    <Text className="text-xl text-pink-600">
                        <Text className="font-bold">{formattedDate}</Text>
                        {' at '}
                        <Text className="font-bold">{formattedTime}</Text>
                    </Text>
                </View>
            </View>

            {/* Countdown */}
            <View className="items-center mb-10">
                <Text className="text-sm text-gray-500 mb-2">
                    Time Remaining
                </Text>
                <Text className="text-4xl font-bold text-pink-500">
                    {formatTime(timeLeft)}
                </Text>
            </View>

            {/* Cancel Button */}
            <Button
                title="Cancel Appointment"
                onPress={handleCancel}
                buttonStyle={{
                    backgroundColor: '#fb7185',
                    borderRadius: 14,
                    paddingVertical: 10,
                }}
                titleStyle={{ fontWeight: '600' }}
            />
        </View>
    );
};

export default QueueScreen;
