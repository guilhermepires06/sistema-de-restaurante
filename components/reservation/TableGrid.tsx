import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

type TableStatus = 'available' | 'reserved' | 'occupied' | 'selected';

interface TableProps {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
}

interface TableGridProps {
  tables: TableProps[];
  selectedTable: string | null;
  onSelectTable: (tableId: string) => void;
}

export default function TableGrid({
  tables,
  selectedTable,
  onSelectTable,
}: TableGridProps) {
  const getTableColor = (status: TableStatus, isSelected: boolean) => {
    if (isSelected) return Colors.primary;
    
    switch (status) {
      case 'available':
        return Colors.success;
      case 'reserved':
        return Colors.warning;
      case 'occupied':
        return Colors.error;
      default:
        return Colors.mediumGray;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.success }]} />
          <Text style={styles.legendText}>Disponível</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.warning }]} />
          <Text style={styles.legendText}>Reservada</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.error }]} />
          <Text style={styles.legendText}>Ocupada</Text>
        </View>
      </View>
      
      <View style={styles.gridContainer}>
        {tables.map((table) => {
          const isSelected = selectedTable === table.id;
          const tableColor = getTableColor(table.status, isSelected);
          const isDisabled = table.status === 'occupied' || table.status === 'reserved';
          
          return (
            <TouchableOpacity
              key={table.id}
              style={[
                styles.table,
                { 
                  backgroundColor: tableColor,
                  opacity: isDisabled ? 0.5 : 1,
                },
                table.seats > 2 && styles.largeTable,
                isSelected && styles.selectedTable,
              ]}
              onPress={() => !isDisabled && onSelectTable(table.id)}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              <Text style={styles.tableNumber}>{table.number}</Text>
              <Text style={styles.tableSeats}>{table.seats} lugares</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spaceLarge,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Sizes.spaceMedium,
    padding: Sizes.spaceSmall,
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusMedium,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Sizes.spaceSmall,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontSmall,
    color: Colors.textMedium,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  table: {
    width: '30%',
    height: 80,
    borderRadius: Sizes.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spaceMedium,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      },
    }),
  },
  largeTable: {
    width: '48%',
    height: 90,
  },
  selectedTable: {
    borderWidth: 2,
    borderColor: Colors.black,
  },
  tableNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontLarge,
    color: Colors.white,
  },
  tableSeats: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontSmall,
    color: Colors.white,
  },
});