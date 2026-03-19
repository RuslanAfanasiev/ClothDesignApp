import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authClient from '../../services/authClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const EmailVerify = () => {
  const navigation = useNavigation<NavProp>();
  const { getUserData, userData, isLoggedIn } = useAppContext();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigation.navigate('Main');
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
      Alert.alert('Error', 'Enter a valid OTP 6 digits' );
      return;
    }
    setLoading(true);
    try {
      const response = await authClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { otp: otpValue });
      if (response.status === 200) {
        Alert.alert('Success', 'Email verified successfully');
        await getUserData();
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', 'Invalid code. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFilled = otp.every((d) => d !== '');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />

      {/* Brand */}
      <View style={styles.brand}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>✦</Text>
        </View>
        <Text style={styles.brandTitle}>FASHION SKETCH</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerBR} />

        <View style={styles.iconRow}>
          <Text style={styles.envelopeIcon}>✉</Text>
        </View>

        <Text style={styles.cardTitle}>Verify Email</Text>
        <Text style={styles.cardSub}>
          Enter the 6-digit code sent{'\n'}to your email address
        </Text>
        <View style={styles.divider} />

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              style={[styles.otpBox, digit && styles.otpBoxFilled]}
              value={digit}
              onChangeText={(val) => handleChange(val, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectionColor="#D4AF37"
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleVerify}
          disabled={loading || !isFilled}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={isFilled ? ['#E8CC6A', '#D4AF37'] : ['#2A2A38', '#2A2A38']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            {loading
              ? <ActivityIndicator color="#0B0B0F" />
              : <Text style={[styles.btnText, !isFilled && styles.btnTextDisabled]}>
                  Verify Email
                </Text>
            }
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backRow}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  brand: { alignItems: 'center', marginBottom: 32 },
  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212,175,55,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandMarkText: { fontSize: 20, color: '#D4AF37' },
  brandTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#D4AF37',
  },

  card: {
    backgroundColor: '#13131A',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A38',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: 28, height: 28,
    borderTopWidth: 1.5, borderLeftWidth: 1.5,
    borderTopLeftRadius: 20, borderColor: '#D4AF37',
  },
  cornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28,
    borderBottomWidth: 1.5, borderRightWidth: 1.5,
    borderBottomRightRadius: 20, borderColor: '#D4AF37',
  },

  iconRow: { alignItems: 'center', marginBottom: 12 },
  envelopeIcon: { fontSize: 36, color: '#D4AF37' },

  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#F0EDE6',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: '#6B6B80',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  divider: { height: 1, backgroundColor: '#2A2A38', marginVertical: 24 },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A38',
    backgroundColor: '#1C1C26',
    fontSize: 22,
    fontWeight: '700',
    color: '#F0EDE6',
  },
  otpBoxFilled: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212,175,55,0.08)',
  },

  btn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnText: { fontSize: 15, fontWeight: '700', color: '#0B0B0F', letterSpacing: 0.5 },
  btnTextDisabled: { color: '#4A4A5A' },

  backRow: { alignItems: 'center', marginTop: 20 },
  backText: { fontSize: 13, color: '#6B6B80', letterSpacing: 0.3 },
});

export default EmailVerify;
