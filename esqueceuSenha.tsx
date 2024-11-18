import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient';

type RootStackParamList = {
  Login: undefined;
};

type EsqueceuSenhaProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const EsqueceuSenha: React.FC<EsqueceuSenhaProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      Alert.alert('Sucesso', 'Link de redefinição enviado para o seu e-mail.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar o e-mail de recuperação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Digite seu e-mail para receber o link de redefinição de senha:</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <Button title="Enviar Link" onPress={handleSendResetLink} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default EsqueceuSenha;
