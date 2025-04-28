import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import TextField from '@/components/ui/TextField';
import MenuItem from '@/components/menu/MenuItem';
import MenuCategories from '@/components/menu/MenuCategories';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { Search, Coffee, Pizza, Sandwich, IceCreamBowl as IceCream, Salad, Wine } from 'lucide-react-native';

// Sample data
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'burgers', name: 'Hambúrgueres', icon: <Sandwich size={16} color={Colors.textDark} /> },
  { id: 'pizzas', name: 'Pizzas', icon: <Pizza size={16} color={Colors.textDark} /> },
  { id: 'salads', name: 'Saladas', icon: <Salad size={16} color={Colors.textDark} /> },
  { id: 'drinks', name: 'Bebidas', icon: <Coffee size={16} color={Colors.textDark} /> },
  { id: 'desserts', name: 'Sobremesas', icon: <IceCream size={16} color={Colors.textDark} /> },
  { id: 'alcoholic', name: 'Alcoólicos', icon: <Wine size={16} color={Colors.textDark} /> },
];

const menuItems = [
  {
    id: '1',
    name: 'Hambúrguer Especial',
    description: 'Pão artesanal, 180g de carne, queijo cheddar, bacon crocante e molho especial',
    price: 29.9,
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'burgers',
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela fresca, manjericão e azeite extra virgem',
    price: 45.9,
    imageUrl: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'pizzas',
  },
  {
    id: '3',
    name: 'Salada Caesar',
    description: 'Alface americana, croutons, queijo parmesão e molho caesar',
    price: 22.5,
    imageUrl: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'salads',
  },
  {
    id: '4',
    name: 'Milk Shake de Chocolate',
    description: 'Leite, sorvete de chocolate, calda de chocolate e chantilly',
    price: 18.9,
    imageUrl: 'https://images.pexels.com/photos/8817434/pexels-photo-8817434.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'desserts',
  },
  {
    id: '5',
    name: 'Coca-Cola Zero',
    description: 'Refrigerante Coca-Cola Zero 350ml',
    price: 5.5,
    imageUrl: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'drinks',
  },
  {
    id: '6',
    name: 'Caipirinha',
    description: 'Limão, açúcar, cachaça e gelo',
    price: 14.9,
    imageUrl: 'https://images.pexels.com/photos/2481189/pexels-photo-2481189.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'alcoholic',
  },
];

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (itemId: string) => {
    // Implementation for adding to cart will go here
    console.log(`Added item ${itemId} to cart`);
  };

  return (
    <Container scroll={false} safeArea={true}>
      <Heading level={1}>Cardápio</Heading>
      
      <View style={styles.searchContainer}>
        <TextField
          placeholder="Buscar item..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={Colors.textMedium} />}
          style={styles.searchInput}
        />
      </View>
      
      <MenuCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            category={categories.find(cat => cat.id === item.category)?.name || ''}
            onAddToCart={handleAddToCart}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: Sizes.spaceMedium,
  },
  searchInput: {
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingBottom: Sizes.spaceXXLarge,
  },
});