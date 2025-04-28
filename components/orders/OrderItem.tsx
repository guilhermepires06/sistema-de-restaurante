import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface OrderItemProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

export default function OrderItem({
  id,
  name,
  quantity,
  price,
  onRemove,
  onChangeQuantity,
}: OrderItemProps) {
  const totalPrice = price * quantity;
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice);

  return (
    <Card style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity
            onPress={() => onRemove(id)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Trash2 size={18} color={Colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => quantity > 1 && onChangeQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Text style={[
                styles.quantityButtonText,
                quantity <= 1 && styles.quantityButtonDisabled
              ]}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onChangeQuantity(id, quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>{formattedPrice}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Sizes.spaceMedium,
    padding: Sizes.spaceMedium,
  },
  contentContainer: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.spaceMedium,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: Sizes.fontRegular,
    color: Colors.textDark,
    flex: 1,
    marginRight: Sizes.spaceSmall,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: Sizes.radiusRound,
    backgroundColor: Colors.primaryTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: Sizes.fontMedium,
    color: Colors.primary,
  },
  quantityButtonDisabled: {
    color: Colors.textLight,
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontRegular,
    color: Colors.textDark,
    marginHorizontal: Sizes.spaceMedium,
    minWidth: 24,
    textAlign: 'center',
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontRegular,
    color: Colors.primary,
  },
});