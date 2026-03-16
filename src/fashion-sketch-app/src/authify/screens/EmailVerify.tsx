import React, { useRef, useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const EmailVerify = () => {
  const navigation = useNavigation<NavProp>();
  const { backendUrl, getUserData, userData, isLoggedIn } = useAppContext();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn, userData]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, '');
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      Alert.alert('Eroare', 'Introdu codul de 6 cifre');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/verify-otp', { otp: otpValue });
      if (response.status === 200) {
        Alert.alert('Succes', 'OTP verificat cu succes');
        await getUserData();
        navigation.navigate('Home');
      } else {
        Alert.alert('Eroare', 'OTP invalid');
      }
    } catch (error) {
      Alert.alert('Eroare', 'Verificarea a eșuat. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification OTP</Text>
      <Text style={styles.subtitle}>Introdu codul de 6 cifre trimis pe email</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            style={styles.otpInput}
            value={digit}
            onChangeText={(val) => handleChange(val, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#6a5af9" />
        ) : (
          <Text style={styles.buttonText}>Verify email</Text>
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.85,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 48,
    height: 56,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a5af9',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#6a5af9',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EmailVerify;
