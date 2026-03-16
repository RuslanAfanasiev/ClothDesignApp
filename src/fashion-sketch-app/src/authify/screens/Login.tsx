import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginNavProp>();
  const { backendUrl, setIsLoggedIn, getUserData, saveToken } = useAppContext();
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (isCreateAccount) {
        const response = await axios.post(`${backendUrl}/register`, { name, email, password });
        if (response.status === 201) {
          Alert.alert('Succes', 'Cont creat cu succes');
          setIsCreateAccount(false);
        }
      } else {
        const response = await axios.post(`${backendUrl}/login`, { email, password });
        if (response.status === 200) {
          await saveToken(response.data.token);
          setIsLoggedIn(true);
          await getUserData();
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      Alert.alert('Eroare', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isCreateAccount ? 'Creare cont' : 'Login'}</Text>

      {isCreateAccount && (
        <TextInput
          style={styles.input}
          placeholder="Nume complet"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!isCreateAccount && (
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.link}>Ai uitat parola?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isCreateAccount ? 'Înregistrare' : 'Login'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsCreateAccount(!isCreateAccount)}>
        <Text style={styles.link}>
          {isCreateAccount ? 'Ai deja cont? Login' : 'Nu ai cont? Înregistrează-te'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#6a5af9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#6a5af9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
});

export default Login;
