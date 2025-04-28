import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Platform } from 'react-native';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import OrderItem from '@/components/orders/OrderItem';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { CreditCard, Wallet } from 'lucide-react-native';

// Sample data
const initialCartItems = [
  { id: '1', name: 'Hambúrguer Especial', quantity: 2, price: 29.9 },
  { id: '2', name: 'Coca-Cola Zero 350ml', quantity: 2, price: 5.5 },
  { id: '4', name: 'Batata Frita Porção Grande', quantity: 1, price: 18.9 },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleChangeQuantity = (id: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleCheckout = () => {
    console.log('Proceed to checkout with:', {
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    });
    
    // Implementation for checkout process will go here
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Container scroll={false} safeArea={true}>
      <Heading level={1}>Carrinho</Heading>
      
      {cartItems.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Button
            title="Ver Cardápio"
            onPress={() => {}}
            style={styles.menuButton}
          />
        </Card>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderItem
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onRemove={handleRemoveItem}
                onChangeQuantity={handleChangeQuantity}
              />
            )}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={styles.checkoutContainer}>
                <Card>
                  <Heading level={4}>Resumo do Pedido</Heading>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
                  </View>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
                  </View>
                  
                  <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                  </View>
                  
                  <Heading level={4} style={styles.paymentTitle}>Método de Pagamento</Heading>
                  
                  <View style={styles.paymentOptions}>
                    <Button
                      title="Cartão"
                      leftIcon={<CreditCard size={20} color={paymentMethod === 'card' ? Colors.white : Colors.primary} />}
                      onPress={() => setPaymentMethod('card')}
                      variant={paymentMethod === 'card' ? 'primary' : 'outline'}
                      style={styles.paymentButton}
                    />
                    
                    <Button
                      title="Dinheiro"
                      leftIcon={<Wallet size={20} color={paymentMethod === 'cash' ? Colors.white : Colors.primary} />}
                      onPress={() => setPaymentMethod('cash')}
                      variant={paymentMethod === 'cash' ? 'primary' : 'outline'}
                      style={styles.paymentButton}
                    />
                  </View>
                  
                  <Button
                    title="Finalizar Pedido"
                    onPress={handleCheckout}
                    disabled={!paymentMethod}
                    style={styles.checkoutButton}
                  />
                </Card>
              </View>
            )}
          />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Sizes.spaceXXLarge,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontRegular,
    color: Colors.textMedium,
    textAlign: 'center',
    marginBottom: Sizes.spaceMedium,
  },
  menuButton: {
    alignSelf: 'center',
  },
  checkoutContainer: {
    marginTop: Sizes.spaceMedium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.spaceMedium,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontMedium,
    color: Colors.textDark,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: Sizes.spaceMedium,
    marginTop: Sizes.spaceSmall,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontLarge,
    color: Colors.textDark,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontXLarge,
    color: Colors.primary,
  },
  paymentTitle: {
    marginTop: Sizes.spaceLarge,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizes.spaceMedium,
  },
  paymentButton: {
    flex: 1,
    marginHorizontal: Sizes.spaceSmall / 2,
  },
  checkoutButton: {
    marginTop: Sizes.spaceMedium,
  },
});