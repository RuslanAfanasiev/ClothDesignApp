import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import authClient from '../../services/authClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { useAppContext } from '../context/AppContext';

const ResetPassword = () => {
  useAppContext();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpValue, setOtpValue] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  const onSubmitEmail = async () => {
    setLoading(true);
    try {
      await authClient.post(`${API_ENDPOINTS.AUTH.SEND_RESET_OTP}?email=${email}`);
      Alert.alert('Succes', 'Codul OTP a fost trimis pe email');
      setIsEmailSent(true);
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const onVerifyOtp = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      Alert.alert('Eroare', 'Introdu codul de 6 cifre');
      return;
    }
    setOtpValue(code);
    setIsOtpSubmitted(true);
  };

  const onResetPassword = async () => {
    setLoading(true);
    try {
      await authClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email, otp: otpValue, newPassword });
      Alert.alert('Succes', 'Parola a fost resetată cu succes');
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resetare Parolă</Text>

      {!isEmailSent && (
        <>
          <Text style={styles.subtitle}>Introdu emailul înregistrat</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onSubmitEmail} disabled={loading}>
            {loading ? <ActivityIndicator color="#6a5af9" /> : <Text style={styles.buttonText}>Trimite</Text>}
          </TouchableOpacity>
        </>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <>
          <Text style={styles.subtitle}>Introdu codul de 6 cifre</Text>
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
          <TouchableOpacity style={styles.button} onPress={onVerifyOtp}>
            <Text style={styles.buttonText}>Verifică</Text>
          </TouchableOpacity>
        </>
      )}

      {isEmailSent && isOtpSubmitted && (
        <>
          <Text style={styles.subtitle}>Introdu noua parolă</Text>
          <TextInput
            style={styles.input}
            placeholder="Parolă nouă"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={onResetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="#6a5af9" /> : <Text style={styles.buttonText}>Resetează</Text>}
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.85,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
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
    marginBottom: 12,
  },
  buttonText: {
    color: '#6a5af9',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ResetPassword;
