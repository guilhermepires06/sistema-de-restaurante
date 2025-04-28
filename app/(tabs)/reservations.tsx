import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import TableGrid from '@/components/reservation/TableGrid';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { Calendar, Clock, Users } from 'lucide-react-native';

// Sample data
const tables = [
  { id: '1', number: 1, seats: 2, status: 'available' },
  { id: '2', number: 2, seats: 2, status: 'available' },
  { id: '3', number: 3, seats: 4, status: 'reserved' },
  { id: '4', number: 4, seats: 4, status: 'available' },
  { id: '5', number: 5, seats: 6, status: 'occupied' },
  { id: '6', number: 6, seats: 2, status: 'available' },
];

export default function ReservationsScreen() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleReservation = () => {
    console.log('Reservation submitted:', {
      table: selectedTable,
      date,
      time,
      guests,
      name,
      phone,
    });
    
    // Implementation for submitting reservation will go here
    // Reset form
    setSelectedTable(null);
    setDate('');
    setTime('');
    setGuests('');
    setName('');
    setPhone('');
  };

  return (
    <Container scroll={true} safeArea={true}>
      <Heading level={1}>Reservas</Heading>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <Heading level={3}>Selecione uma Mesa</Heading>
          <Text style={styles.instructionText}>
            Escolha uma mesa disponível para sua reserva
          </Text>
          
          <TableGrid
            tables={tables}
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />
          
          <View style={styles.formContainer}>
            <Heading level={4}>Detalhes da Reserva</Heading>
            
            <TextField
              label="Data"
              placeholder="DD/MM/YYYY"
              value={date}
              onChangeText={setDate}
              leftIcon={<Calendar size={20} color={Colors.textMedium} />}
              keyboardType="number-pad"
            />
            
            <TextField
              label="Horário"
              placeholder="HH:MM"
              value={time}
              onChangeText={setTime}
              leftIcon={<Clock size={20} color={Colors.textMedium} />}
              keyboardType="number-pad"
            />
            
            <TextField
              label="Número de pessoas"
              placeholder="Digite o número de pessoas"
              value={guests}
              onChangeText={setGuests}
              leftIcon={<Users size={20} color={Colors.textMedium} />}
              keyboardType="number-pad"
            />
            
            <TextField
              label="Seu nome"
              placeholder="Digite seu nome completo"
              value={name}
              onChangeText={setName}
            />
            
            <TextField
              label="Telefone"
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            
            <Button
              title="Confirmar Reserva"
              onPress={handleReservation}
              disabled={!selectedTable || !date || !time || !guests || !name || !phone}
              style={styles.submitButton}
            />
          </View>
        </Card>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    marginBottom: Sizes.spaceLarge,
  },
  formContainer: {
    marginTop: Sizes.spaceLarge,
  },
  submitButton: {
    marginTop: Sizes.spaceMedium,
  },
});