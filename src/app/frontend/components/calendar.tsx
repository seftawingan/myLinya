import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

type SelectedDateInfo = {
    date: string;
    queueCount: number;
};

type DateObject = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

type Props = {
    onDateSelect: (info: SelectedDateInfo) => void;
    selectedDate?: string; //optional
};

//Mock queue data for different dates
const mockQueueData: Record<string, number> = {
    '2026-02-01': 22,
    '2026-02-02': 28,
    '2026-02-03': 32,
    '2026-02-04': 12,
    '2026-02-05': 30,
    '2026-02-06': 20,
    '2026-02-07': 15,
    '2026-02-08': 23,
    '2026-02-09': 10,
};


const Calendar: React.FC<Props> = ({ onDateSelect, selectedDate }) => {
    //Called when a day is pressed
    const handleDayPress = (day: DateObject) => {
        const date = day.dateString;
        const queueCount = mockQueueData[date] ?? 0;

        onDateSelect({ date, queueCount });
    };

    //Marked dates for the calendar
    const markedDates: MarkedDates = Object.keys(mockQueueData).reduce((acc, date) => {
        const queue = mockQueueData[date];
        acc[date] = {
            marked: queue > 0,                           //show a dot
            dotColor: 'pink',                       //dot color for busy day
            selected: selectedDate === date,        //highlight selected date
            selectedColor: 'lightpink',             //color for selected date
        }
        return acc;
    }, {} as MarkedDates);

    return (
        <View>
            <RNCalendar
                onDayPress={handleDayPress}
                markingType='dot'
                markedDates={markedDates}
                minDate={new Date().toISOString().split('T')[0]} //disable past dates
            />
            <Text style={{ marginTop: 8, fontSize: 14 }}>
                *Tap a date to see queue count.
            </Text>
        </View>
    );
};

export default Calendar;