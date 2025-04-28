import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  onAddToCart: (id: string) => void;
}

export default function MenuItem({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  onAddToCart,
}: MenuItemProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>{formattedPrice}</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddToCart(id)}
          activeOpacity={0.7}
        >
          <PlusCircle size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Sizes.spaceMedium,
    padding: 0,
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? {
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      ':hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      },
    } : {}),
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: Sizes.spaceSmall,
    left: Sizes.spaceSmall,
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.spaceMedium,
    paddingVertical: Sizes.spaceSmall / 2,
    borderRadius: Sizes.radiusRound,
  },
  categoryText: {
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: Sizes.fontSmall,
  },
  contentContainer: {
    padding: Sizes.spaceMedium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Sizes.spaceSmall,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontLarge,
    color: Colors.textDark,
    flex: 1,
    marginRight: Sizes.spaceSmall,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontMedium,
    color: Colors.primary,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    marginBottom: Sizes.spaceMedium,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: Sizes.fontMedium,
    color: Colors.primary,
    marginLeft: Sizes.spaceSmall,
  },
});