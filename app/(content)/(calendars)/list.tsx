import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarList } from "react-native-calendars";

export default function CalendarListScreen() {
    const [selected, setSelected] = useState<string>(dayjs().format('YYYY-MM-DD'));
    return (
        <CalendarList
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
                [dayjs().add(1, 'day').format('YYYY-MM-DD')]: {disabled: true},
                [dayjs().add(2, 'day').format('YYYY-MM-DD')]: {
                    selected: selected === dayjs().add(2, 'day').format('YYYY-MM-DD'),
                    marked: true,
                    dotColor: 'red',
                },
            }}
            pastScrollRange={2}
            futureScrollRange={10}
        />
    )
}