import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
}

export default function PromotionCard({
  title,
  description,
  image,
  onPress,
}: PromotionCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Ver Mais</Text>
          <ArrowRight size={16} color={Colors.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: Sizes.radiusLarge,
    overflow: 'hidden',
    marginBottom: Sizes.spaceMedium,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    padding: Sizes.spaceLarge,
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontXLarge,
    color: Colors.white,
    marginBottom: Sizes.spaceSmall,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.white,
    marginBottom: Sizes.spaceMedium,
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: Sizes.fontMedium,
    color: Colors.white,
    marginRight: Sizes.spaceSmall,
  },
});