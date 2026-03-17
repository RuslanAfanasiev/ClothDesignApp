import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authClient from '../../services/authClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { useAppContext } from '../context/AppContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginNavProp>();
  const { setIsLoggedIn, getUserData, saveToken } = useAppContext();
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (isCreateAccount) {
        const response = await authClient.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
        if (response.status === 201) {
          Alert.alert('Succes', 'Cont creat cu succes');
          setIsCreateAccount(false);
        }
      } else {
        const response = await authClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
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

  const canSubmit = isCreateAccount
    ? name.trim() && email.trim() && password.trim()
    : email.trim() && password.trim();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>✦</Text>
            </View>
            <Text style={styles.brandTitle}>FASHION SKETCH</Text>
            <Text style={styles.brandSub}>Your creative atelier</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerBR} />

            <Text style={styles.cardTitle}>
              {isCreateAccount ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.cardSub}>
              {isCreateAccount
                ? 'Start your fashion journey'
                : 'Sign in to your atelier'}
            </Text>
            <View style={styles.divider} />

            {isCreateAccount && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput
                  style={[styles.input, focusedField === 'name' && styles.inputFocused]}
                  placeholder="e.g. Maria Ionescu"
                  placeholderTextColor="#4A4A5A"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  selectionColor="#D4AF37"
                />
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={[styles.input, focusedField === 'email' && styles.inputFocused]}
                placeholder="your@email.com"
                placeholderTextColor="#4A4A5A"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                selectionColor="#D4AF37"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={[styles.input, focusedField === 'password' && styles.inputFocused]}
                placeholder="••••••••"
                placeholderTextColor="#4A4A5A"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                selectionColor="#D4AF37"
              />
            </View>

            {!isCreateAccount && (
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}
                style={styles.forgotRow}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading || !canSubmit}
              activeOpacity={0.85}
              style={styles.btnWrapper}
            >
              <LinearGradient
                colors={canSubmit ? ['#E8CC6A', '#D4AF37'] : ['#2A2A38', '#2A2A38']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                {loading
                  ? <ActivityIndicator color="#0B0B0F" />
                  : <Text style={[styles.btnText, !canSubmit && styles.btnTextDisabled]}>
                      {isCreateAccount ? 'Create Account' : 'Sign In'}
                    </Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Switch mode */}
          <TouchableOpacity
            onPress={() => setIsCreateAccount(!isCreateAccount)}
            style={styles.switchRow}
          >
            <Text style={styles.switchText}>
              {isCreateAccount ? 'Already have an account? ' : "Don't have an account? "}
            </Text>
            <Text style={styles.switchLink}>
              {isCreateAccount ? 'Sign In' : 'Register'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0B0B0F' },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },

  brand: { alignItems: 'center', marginBottom: 36 },
  brandMark: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(212,175,55,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  brandMarkText: { fontSize: 22, color: '#D4AF37' },
  brandTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#D4AF37',
    marginBottom: 4,
  },
  brandSub: { fontSize: 11, color: '#6B6B80', letterSpacing: 1.5 },

  card: {
    backgroundColor: '#13131A',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A38',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 20,
    borderColor: '#D4AF37',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 20,
    borderColor: '#D4AF37',
  },

  cardTitle: { fontSize: 22, fontWeight: '600', color: '#F0EDE6', letterSpacing: 0.3, marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#6B6B80', letterSpacing: 0.3 },
  divider: { height: 1, backgroundColor: '#2A2A38', marginVertical: 20 },

  fieldGroup: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#6B6B80',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1C1C26',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A38',
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#F0EDE6',
  },
  inputFocused: { borderColor: '#D4AF37' },

  forgotRow: { alignItems: 'flex-end', marginBottom: 20, marginTop: -4 },
  forgotText: { fontSize: 12, color: '#6B6B80', letterSpacing: 0.3 },

  btnWrapper: { marginTop: 4 },
  btn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnText: { fontSize: 15, fontWeight: '700', color: '#0B0B0F', letterSpacing: 0.5 },
  btnTextDisabled: { color: '#4A4A5A' },

  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  switchText: { fontSize: 13, color: '#6B6B80' },
  switchLink: { fontSize: 13, color: '#D4AF37', fontWeight: '600' },
});

export default Login;
