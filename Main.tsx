import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient';

type RootStackParamList = {
  Login: undefined;
};

type MainProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Main: React.FC<MainProps> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao tentar fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Bem-vindo à tela principal!</Text>
      <Button title="Logout" onPress={handleLogout} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
