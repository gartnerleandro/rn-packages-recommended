import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../themes/theme';

// Traducción al español (opcional)
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy'
};
// LocaleConfig.defaultLocale = 'es'; // Descomenta para usar español

// Tipos de ejemplos para mostrar
const EXAMPLES = [
  { 
    id: 'basic',
    title: 'Calendario básico', 
    description: 'Calendario simple con selección de fecha'
  },
  { 
    id: 'marked',
    title: 'Con marcas', 
    description: 'Días marcados con puntos o períodos'
  },
  { 
    id: 'multi',
    title: 'Selección múltiple', 
    description: 'Permite seleccionar varias fechas'
  },
  { 
    id: 'agenda',
    title: 'Agenda', 
    description: 'Vista de agenda con items'
  }
];

// Obtener la fecha actual en formato YYYY-MM-DD
const getTodayString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Datos de ejemplo para la agenda
const agendaItems = {
  [getTodayString()]: [
    { name: 'Reunión de equipo', height: 80, day: getTodayString(), time: '10:00 - 11:30' },
    { name: 'Almuerzo con cliente', height: 80, day: getTodayString(), time: '13:00 - 14:30' },
  ],
  [(new Date(Date.now() + 86400000)).toISOString().split('T')[0]]: [
    { name: 'Entrega de proyecto', height: 80, day: (new Date(Date.now() + 86400000)).toISOString().split('T')[0], time: '09:00 - 10:00' },
  ],
  [(new Date(Date.now() + 172800000)).toISOString().split('T')[0]]: [
    { name: 'Llamada con inversores', height: 80, day: (new Date(Date.now() + 172800000)).toISOString().split('T')[0], time: '15:00 - 16:00' },
    { name: 'Revisión de código', height: 80, day: (new Date(Date.now() + 172800000)).toISOString().split('T')[0], time: '16:30 - 18:00' },
  ]
};

export default function CalendarExample() {
  const [activeExample, setActiveExample] = useState('basic');
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [markedDates, setMarkedDates] = useState({
    [getTodayString()]: { selected: true, marked: true, selectedColor: theme.colors.primary }
  });
  const [multiSelectedDates, setMultiSelectedDates] = useState({
    [getTodayString()]: { selected: true, selectedColor: theme.colors.primary }
  });
  
  // Manejar la selección de una fecha en el calendario básico
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, marked: true, selectedColor: theme.colors.primary }
    });
    Alert.alert('Fecha seleccionada', `Has seleccionado: ${day.dateString}`);
  };
  
  // Manejar la selección múltiple de fechas
  const handleMultiDayPress = (day: DateData) => {
    const updatedDates = { ...multiSelectedDates };
    
    if (updatedDates[day.dateString]) {
      // Si ya está seleccionada, eliminarla
      delete updatedDates[day.dateString];
    } else {
      // Si no está seleccionada, agregarla
      updatedDates[day.dateString] = { selected: true, selectedColor: theme.colors.primary };
    }
    
    setMultiSelectedDates(updatedDates);
  };
  
  // Renderizar el ejemplo seleccionado
  const renderExample = () => {
    switch (activeExample) {
      case 'basic':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Calendario Básico</Text>
            <Text style={styles.exampleDescription}>
              Un calendario simple con selección de una fecha. Personalizable con tema y eventos onDayPress.
            </Text>
            
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: theme.colors.primary }
                }}
                theme={{
                  calendarBackground: theme.colors.card,
                  textSectionTitleColor: theme.colors.primary,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: theme.colors.primary,
                  dayTextColor: theme.colors.text,
                  textDisabledColor: theme.colors.textSecondary,
                  arrowColor: theme.colors.primary,
                }}
              />
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { Calendar } from 'react-native-calendars';

<Calendar
  onDayPress={(day) => {
    console.log('Día seleccionado:', day.dateString);
  }}
  markedDates={{
    '2023-05-16': {
      selected: true,
      selectedColor: '#6C00FF'
    }
  }}
  theme={{
    calendarBackground: '#F3F4F6',
    textSectionTitleColor: '#6200EE',
    selectedDayBackgroundColor: '#6200EE',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#6200EE',
    dayTextColor: '#1F2937',
    textDisabledColor: '#9CA3AF',
  }}
/>`}
              </Text>
            </View>
          </View>
        );
        
      case 'marked':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Días Marcados</Text>
            <Text style={styles.exampleDescription}>
              Marca días específicos con puntos, períodos o personaliza completamente su apariencia.
            </Text>
            
            <View style={styles.calendarContainer}>
              <Calendar
                markingType={'period'}
                markedDates={{
                  [getTodayString()]: { 
                    marked: true, 
                    dotColor: theme.colors.primary 
                  },
                  [(new Date(Date.now() + 86400000)).toISOString().split('T')[0]]: { 
                    marked: true, 
                    dotColor: theme.colors.success 
                  },
                  [(new Date(Date.now() + 172800000)).toISOString().split('T')[0]]: { 
                    marked: true, 
                    dotColor: theme.colors.warning
                  },
                  [(new Date(Date.now() + 259200000)).toISOString().split('T')[0]]: { 
                    startingDay: true, 
                    color: `${theme.colors.primary}30` 
                  },
                  [(new Date(Date.now() + 345600000)).toISOString().split('T')[0]]: { 
                    color: `${theme.colors.primary}30` 
                  },
                  [(new Date(Date.now() + 432000000)).toISOString().split('T')[0]]: { 
                    endingDay: true, 
                    color: `${theme.colors.primary}30` 
                  },
                }}
                theme={{
                  calendarBackground: theme.colors.card,
                  textSectionTitleColor: theme.colors.primary,
                  dayTextColor: theme.colors.text,
                  todayTextColor: theme.colors.primary,
                  textDisabledColor: theme.colors.textSecondary,
                  arrowColor: theme.colors.primary,
                }}
              />
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`<Calendar
  markingType={'period'}
  markedDates={{
    '2023-05-15': { 
      marked: true, 
      dotColor: '#6200EE' 
    },
    '2023-05-20': { 
      startingDay: true, 
      color: 'rgba(98, 0, 238, 0.2)' 
    },
    '2023-05-21': { 
      color: 'rgba(98, 0, 238, 0.2)' 
    },
    '2023-05-22': { 
      endingDay: true, 
      color: 'rgba(98, 0, 238, 0.2)' 
    },
  }}
/>`}
              </Text>
            </View>
          </View>
        );
        
      case 'multi':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Selección Múltiple</Text>
            <Text style={styles.exampleDescription}>
              Permite seleccionar varias fechas, ideal para selección de múltiples días.
            </Text>
            
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleMultiDayPress}
                markedDates={multiSelectedDates}
                markingType={'multi-dot'}
                theme={{
                  calendarBackground: theme.colors.card,
                  textSectionTitleColor: theme.colors.primary,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: theme.colors.primary,
                  dayTextColor: theme.colors.text,
                  textDisabledColor: theme.colors.textSecondary,
                  arrowColor: theme.colors.primary,
                }}
              />
              
              <View style={styles.selectedDatesContainer}>
                <Text style={styles.selectedDatesTitle}>Fechas seleccionadas:</Text>
                {Object.keys(multiSelectedDates).length > 0 ? (
                  Object.keys(multiSelectedDates).map((date) => (
                    <Text key={date} style={styles.selectedDateItem}>
                      • {date}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.noSelectionText}>Ninguna fecha seleccionada</Text>
                )}
              </View>
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`// Estado para las fechas seleccionadas
const [selectedDates, setSelectedDates] = useState({});

// Función para manejar la selección
const handleDayPress = (day) => {
  const updatedDates = { ...selectedDates };
  
  if (updatedDates[day.dateString]) {
    delete updatedDates[day.dateString];
  } else {
    updatedDates[day.dateString] = { 
      selected: true, 
      selectedColor: '#6200EE' 
    };
  }
  
  setSelectedDates(updatedDates);
};

// En el componente
<Calendar
  onDayPress={handleDayPress}
  markedDates={selectedDates}
/>`}
              </Text>
            </View>
          </View>
        );
        
      case 'agenda':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Vista de Agenda</Text>
            <Text style={styles.exampleDescription}>
              Combina un calendario con una lista de eventos para cada día seleccionado.
            </Text>
            
            <View style={styles.agendaContainer}>
              <Agenda
                items={agendaItems}
                selected={getTodayString()}
                renderItem={(item) => (
                  <View style={styles.agendaItem}>
                    <View style={styles.agendaItemHeader}>
                      <Text style={styles.agendaItemTime}>{item.time}</Text>
                      <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.agendaItemName}>{item.name}</Text>
                  </View>
                )}
                renderEmptyDate={() => (
                  <View style={styles.emptyDate}>
                    <Text style={styles.emptyDateText}>No hay eventos programados</Text>
                  </View>
                )}
                rowHasChanged={(r1, r2) => r1.name !== r2.name}
                theme={{
                  calendarBackground: theme.colors.card,
                  agendaKnobColor: theme.colors.primary,
                  selectedDayBackgroundColor: theme.colors.primary,
                  dotColor: theme.colors.primary,
                  todayTextColor: theme.colors.primary,
                  agendaDayTextColor: theme.colors.text,
                  agendaDayNumColor: theme.colors.text,
                  agendaTodayColor: theme.colors.primary,
                  backgroundColor: theme.colors.background,
                }}
              />
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { Agenda } from 'react-native-calendars';

// Datos de la agenda
const items = {
  '2023-05-15': [
    { name: 'Reunión de equipo', time: '10:00' },
    { name: 'Almuerzo con cliente', time: '13:00' }
  ],
  '2023-05-16': [
    { name: 'Entrega de proyecto', time: '09:00' }
  ]
};

<Agenda
  items={items}
  selected={'2023-05-15'}
  renderItem={(item) => (
    <View style={styles.item}>
      <Text style={styles.itemTime}>{item.time}</Text>
      <Text>{item.name}</Text>
    </View>
  )}
  renderEmptyDate={() => (
    <View style={styles.emptyDate}>
      <Text>No hay eventos</Text>
    </View>
  )}
  rowHasChanged={(r1, r2) => r1.name !== r2.name}
/>`}
              </Text>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Calendars</Text>
      <Text style={styles.description}>
        Implementa calendarios completamente personalizables con múltiples vistas, 
        marcado de fechas, selección múltiple y vista de agenda.
      </Text>
      
      {/* Selector de ejemplos */}
      <View style={styles.optionsContainer}>
        {EXAMPLES.map((example) => (
          <Pressable
            key={example.id}
            style={[
              styles.optionButton,
              activeExample === example.id && styles.activeOption
            ]}
            onPress={() => setActiveExample(example.id)}
          >
            <Text 
              style={[
                styles.optionText,
                activeExample === example.id && styles.activeOptionText
              ]}
            >
              {example.title}
            </Text>
            <Text style={styles.optionDescription}>{example.description}</Text>
          </Pressable>
        ))}
      </View>
      
      {/* Contenido del ejemplo */}
      {renderExample()}
      
      {/* Documentación adicional */}
      <View style={styles.docsContainer}>
        <Text style={styles.docsTitle}>Características principales</Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="color-palette-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Personalización completa</Text>
          </View>
          <Text style={styles.featureDescription}>
            Personaliza colores, formas y comportamientos de todos los elementos del calendario.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="language-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Internacionalización</Text>
          </View>
          <Text style={styles.featureDescription}>
            Soporte para múltiples idiomas y formatos de fecha.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="calendar-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Múltiples vistas</Text>
          </View>
          <Text style={styles.featureDescription}>
            Vista de calendario, lista desplazable o agenda con eventos.
          </Text>
        </View>
        
        <Text style={styles.githubLink}>
          Más información: github.com/wix/react-native-calendars
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
  },
  optionsContainer: {
    marginBottom: theme.spacing.l,
  },
  optionButton: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  activeOption: {
    borderLeftColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  activeOptionText: {
    color: theme.colors.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  exampleContainer: {
    marginBottom: theme.spacing.l,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  exampleDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  calendarContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  agendaContainer: {
    height: 500,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  selectedDatesContainer: {
    padding: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  selectedDatesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  selectedDateItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  noSelectionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  agendaItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginRight: theme.spacing.m,
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.s,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  agendaItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  agendaItemTime: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  agendaItemName: {
    fontSize: 16,
    color: theme.colors.text,
  },
  emptyDate: {
    height: 80,
    flex: 1,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDateText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginTop: theme.spacing.m,
  },
  codeTitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  code: {
    color: '#E6E6E6',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  docsContainer: {
    marginBottom: theme.spacing.xl,
  },
  docsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  featureContainer: {
    marginBottom: theme.spacing.m,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.s,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 30,
  },
  githubLink: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  },
}); 