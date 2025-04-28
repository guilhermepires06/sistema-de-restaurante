import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle[] => {
    const buttonStyles: ViewStyle[] = [styles.button];
    
    // Add variant-specific styles
    switch (variant) {
      case 'primary':
        buttonStyles.push(styles.primary);
        break;
      case 'secondary':
        buttonStyles.push(styles.secondary);
        break;
      case 'outline':
        buttonStyles.push(styles.outline);
        break;
      case 'ghost':
        buttonStyles.push(styles.ghost);
        break;
    }
    
    // Add size-specific styles
    switch (size) {
      case 'small':
        buttonStyles.push(styles.small);
        break;
      case 'medium':
        buttonStyles.push(styles.medium);
        break;
      case 'large':
        buttonStyles.push(styles.large);
        break;
    }
    
    // Add disabled styles
    if (disabled) {
      buttonStyles.push(styles.disabled);
    }
    
    // Add full width style
    if (fullWidth) {
      buttonStyles.push(styles.fullWidth);
    }
    
    return buttonStyles;
  };
  
  const getTextStyles = (): TextStyle[] => {
    const textStyles: TextStyle[] = [styles.text];
    
    // Add variant-specific text styles
    switch (variant) {
      case 'primary':
      case 'secondary':
        textStyles.push(styles.textLight);
        break;
      case 'outline':
      case 'ghost':
        textStyles.push(styles.textDark);
        break;
    }
    
    // Add size-specific text styles
    switch (size) {
      case 'small':
        textStyles.push(styles.textSmall);
        break;
      case 'medium':
        textStyles.push(styles.textMedium);
        break;
      case 'large':
        textStyles.push(styles.textLarge);
        break;
    }
    
    // Add disabled text styles
    if (disabled) {
      textStyles.push(styles.textDisabled);
    }
    
    return textStyles;
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyles(), style]}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator 
            color={variant === 'primary' || variant === 'secondary' ? Colors.white : Colors.primary} 
            size="small" 
          />
        ) : (
          <>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
            <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  small: {
    paddingVertical: Sizes.spaceSmall,
    paddingHorizontal: Sizes.spaceMedium,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Sizes.spaceMedium,
    paddingHorizontal: Sizes.spaceLarge,
    minHeight: Sizes.buttonHeight,
  },
  large: {
    paddingVertical: Sizes.spaceLarge,
    paddingHorizontal: Sizes.spaceXLarge,
    minHeight: 56,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  textLight: {
    color: Colors.white,
  },
  textDark: {
    color: Colors.primary,
  },
  textSmall: {
    fontSize: Sizes.fontSmall,
  },
  textMedium: {
    fontSize: Sizes.fontMedium,
  },
  textLarge: {
    fontSize: Sizes.fontLarge,
  },
  textDisabled: {
    color: Colors.mediumGray,
  },
  iconLeft: {
    marginRight: Sizes.spaceSmall,
  },
  iconRight: {
    marginLeft: Sizes.spaceSmall,
  },
});