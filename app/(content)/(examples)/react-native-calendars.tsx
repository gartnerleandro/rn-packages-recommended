import dayjs from "dayjs";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['es'] = {
    "monthNames": [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  "monthNamesShort": [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic."
  ],
  "dayNames": [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ],
  "dayNamesShort": ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
  "weekDays": {
    "monday": "L",
    "tuesday": "M",
    "wednesday": "X",
    "thursday": "J",
    "friday": "V",
    "saturday": "S",
    "sunday": "D"
  },
}

LocaleConfig.defaultLocale = 'es';


export default function ReactNativeCalendars() {
    const [selected, setSelected] = useState<string>(dayjs().format('YYYY-MM-DD'));

    return (
    <ScrollView bounces={false} style={styles.container}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
            [dayjs().add(1, 'day').format('YYYY-MM-DD')]: {disabled: true},
            [dayjs().add(2, 'day').format('YYYY-MM-DD')]: {
                selected: selected === dayjs().add(2, 'day').format('YYYY-MM-DD'),
                marked: true,
                dotColor: 'black',
                selectedColor: 'orange',
            }
          }}
        />

        <Link href="/(content)/(calendars)/list" asChild>
            <Button title="CalendarList" />
        </Link>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    }
})