import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface CategoryProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface MenuCategoriesProps {
  categories: CategoryProps[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function MenuCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: MenuCategoriesProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.7}
          >
            {category.icon && <View style={styles.icon}>{category.icon}</View>}
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spaceMedium,
  },
  scrollContent: {
    paddingVertical: Sizes.spaceSmall,
    paddingHorizontal: Sizes.spaceSmall,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spaceMedium,
    paddingVertical: Sizes.spaceSmall,
    borderRadius: Sizes.radiusRound,
    marginRight: Sizes.spaceSmall,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    marginRight: Sizes.spaceSmall,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontMedium,
    color: Colors.textDark,
  },
  selectedCategoryText: {
    color: Colors.white,
  },
});