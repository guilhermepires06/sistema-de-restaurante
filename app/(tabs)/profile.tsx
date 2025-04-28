import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { User, History, MapPin, CreditCard, Settings, CircleHelp as HelpCircle, LogOut, ChevronRight, ShieldCheck } from 'lucide-react-native';

// Sample user data
const userData = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
};

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAdminLogin = () => {
    router.push('/admin');
  };
  
  const ProfileOption = ({ 
    icon, 
    title, 
    onPress, 
    lastItem = false,
    color = Colors.primary
  }: { 
    icon: React.ReactNode, 
    title: string, 
    onPress: () => void,
    lastItem?: boolean,
    color?: string
  }) => (
    <TouchableOpacity 
      style={[styles.optionItem, !lastItem && styles.optionItemBorder]} 
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={[styles.optionIconContainer, { backgroundColor: `${color}10` }]}>
        {icon}
      </View>
      <Text style={[styles.optionText, { color }]}>{title}</Text>
      <ChevronRight size={20} color={Colors.mediumGray} />
    </TouchableOpacity>
  );

  return (
    <Container scroll={true} safeArea={true}>
      <Heading level={1}>Perfil</Heading>
      
      {isLoggedIn ? (
        <>
          <Card style={styles.userCard}>
            <View style={styles.userIconContainer}>
              <User size={40} color={Colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.userPhone}>{userData.phone}</Text>
            </View>
            <Button
              title="Editar"
              onPress={() => {}}
              variant="outline"
              size="small"
              style={styles.editButton}
            />
          </Card>
          
          <Card style={styles.optionsCard}>
            <ProfileOption 
              icon={<History size={22} color={Colors.primary} />} 
              title="Histórico de Pedidos" 
              onPress={() => {}}
            />
            <ProfileOption 
              icon={<MapPin size={22} color={Colors.primary} />} 
              title="Endereços Salvos" 
              onPress={() => {}}
            />
            <ProfileOption 
              icon={<CreditCard size={22} color={Colors.primary} />} 
              title="Métodos de Pagamento" 
              onPress={() => {}}
            />
            <ProfileOption 
              icon={<Settings size={22} color={Colors.primary} />} 
              title="Configurações" 
              onPress={() => {}}
            />
            <ProfileOption 
              icon={<HelpCircle size={22} color={Colors.primary} />} 
              title="Ajuda & Suporte" 
              onPress={() => {}}
            />
            <ProfileOption 
              icon={<ShieldCheck size={22} color={Colors.success} />}
              title="Área do Administrador"
              onPress={handleAdminLogin}
              color={Colors.success}
            />
            <ProfileOption 
              icon={<LogOut size={22} color={Colors.error} />} 
              title="Sair" 
              onPress={handleLogout}
              lastItem
              color={Colors.error}
            />
          </Card>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Versão 1.0.0</Text>
          </View>
        </>
      ) : (
        <Card style={styles.loginCard}>
          <Heading level={3} centered>Entrar na sua conta</Heading>
          <Text style={styles.loginText}>
            Faça login para acompanhar seus pedidos, reservas e muito mais
          </Text>
          <Button
            title="Entrar"
            onPress={handleLogin}
            style={styles.loginButton}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.registerText}>
              Ainda não tem uma conta? Registre-se
            </Text>
          </TouchableOpacity>
        </Card>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.spaceLarge,
    marginBottom: Sizes.spaceMedium,
  },
  userIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Sizes.spaceLarge,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontLarge,
    color: Colors.textDark,
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    marginBottom: 2,
  },
  userPhone: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  optionsCard: {
    padding: 0,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.spaceMedium,
  },
  optionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Sizes.spaceMedium,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontRegular,
    color: Colors.textDark,
    flex: 1,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: Sizes.spaceXLarge,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontSmall,
    color: Colors.textLight,
  },
  loginCard: {
    padding: Sizes.spaceLarge,
    marginTop: Sizes.spaceXLarge,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontMedium,
    color: Colors.textMedium,
    textAlign: 'center',
    marginBottom: Sizes.spaceLarge,
  },
  loginButton: {
    marginBottom: Sizes.spaceMedium,
  },
  registerText: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontMedium,
    color: Colors.primary,
    textAlign: 'center',
  },
});