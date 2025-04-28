import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AdminLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Admin Dashboard',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="products"
          options={{
            title: 'Manage Products',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="categories"
          options={{
            title: 'Manage Categories',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="orders"
          options={{
            title: 'Manage Orders',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="tables"
          options={{
            title: 'Manage Tables',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="reservations"
          options={{
            title: 'Manage Reservations',
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}