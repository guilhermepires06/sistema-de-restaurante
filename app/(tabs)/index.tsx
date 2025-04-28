import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import PromotionCard from '@/components/home/PromotionCard';
import MenuItem from '@/components/menu/MenuItem';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { Bell, Clock } from 'lucide-react-native';

// Sample data
const featuredItems = [
  {
    id: '1',
    name: 'Hambúrguer Especial',
    description: 'Pão artesanal, 180g de carne, queijo cheddar, bacon crocante e molho especial',
    price: 29.90,
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Hambúrgueres',
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela fresca, manjericão e azeite extra virgem',
    price: 45.90,
    imageUrl: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Pizzas',
  },
];

export default function HomeScreen() {
  return (
    <Container scroll={true} safeArea={true}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Bem-vindo!</Text>
          <Text style={styles.subGreeting}>O que você deseja hoje?</Text>
        </View>
        <View style={styles.notificationIcon}>
          <Bell size={24} color={Colors.textDark} />
        </View>
      </View>

      <View style={styles.restaurantInfoCard}>
        <View style={styles.restaurantStatus}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusText}>Aberto agora</Text>
        </View>
        
        <View style={styles.hours}>
          <Clock size={16} color={Colors.textMedium} />
          <Text style={styles.hoursText}>11:00 - 22:00</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.promotionsContainer}
        contentContainerStyle={styles.promotionsContent}
      >
        <PromotionCard
          title="Segunda de Pizza"
          description="Todas as pizzas com 30% de desconto toda segunda-feira"
          image="https://images.pexels.com/photos/3915855/pexels-photo-3915855.jpeg?auto=compress&cs=tinysrgb&w=600"
          onPress={() => {}}
        />
        <PromotionCard
          title="Combo Família"
          description="4 hambúrgueres + batata + refrigerante por apenas R$99,90"
          image="https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600"
          onPress={() => {}}
        />
      </ScrollView>

      <View style={styles.section}>
        <Heading level={2}>Mais Pedidos</Heading>
        
        {featuredItems.map(item => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            category={item.category}
            onAddToCart={() => {}}
          />
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.spaceLarge,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontXLarge,
    color: Colors.textDark,
  },
  subGreeting: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    marginTop: 2,
  },
  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Sizes.spaceMedium,
    borderRadius: Sizes.radiusMedium,
    marginBottom: Sizes.spaceLarge,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    marginRight: Sizes.spaceSmall,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: Sizes.fontMedium,
    color: Colors.textDark,
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    marginLeft: Sizes.spaceSmall,
  },
  promotionsContainer: {
    marginBottom: Sizes.spaceLarge,
  },
  promotionsContent: {
    paddingRight: Sizes.spaceLarge,
  },
  section: {
    marginBottom: Sizes.spaceLarge,
  },
});