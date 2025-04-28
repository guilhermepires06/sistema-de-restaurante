import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { 
  UtensilsCrossed, 
  LayoutGrid, 
  ShoppingBag, 
  CalendarDays,
  Table as TableIcon,
  ChevronRight 
} from 'lucide-react-native';

const adminMenuItems = [
  {
    title: 'Products',
    description: 'Manage menu items and their details',
    icon: <UtensilsCrossed size={24} color={Colors.primary} />,
    route: '/admin/products',
  },
  {
    title: 'Categories',
    description: 'Organize products into categories',
    icon: <LayoutGrid size={24} color={Colors.primary} />,
    route: '/admin/categories',
  },
  {
    title: 'Orders',
    description: 'View and manage customer orders',
    icon: <ShoppingBag size={24} color={Colors.primary} />,
    route: '/admin/orders',
  },
  {
    title: 'Tables',
    description: 'Manage restaurant tables',
    icon: <TableIcon size={24} color={Colors.primary} />,
    route: '/admin/tables',
  },
  {
    title: 'Reservations',
    description: 'Handle table reservations',
    icon: <CalendarDays size={24} color={Colors.primary} />,
    route: '/admin/reservations',
  },
];

export default function AdminDashboard() {
  return (
    <Container>
      <Heading level={1}>Admin Dashboard</Heading>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {adminMenuItems.map((item, index) => (
          <Link key={index} href={item.route} asChild>
            <Card style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <View style={styles.textContainer}>
                  <Heading level={3} style={styles.menuItemTitle}>
                    {item.title}
                  </Heading>
                  <Heading level={5} style={styles.menuItemDescription}>
                    {item.description}
                  </Heading>
                </View>
                <ChevronRight size={24} color={Colors.mediumGray} />
              </View>
            </Card>
          </Link>
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    marginBottom: Sizes.spaceMedium,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Sizes.spaceMedium,
  },
  textContainer: {
    flex: 1,
  },
  menuItemTitle: {
    marginBottom: Sizes.spaceSmall / 2,
  },
  menuItemDescription: {
    color: Colors.textMedium,
    marginBottom: 0,
  },
});