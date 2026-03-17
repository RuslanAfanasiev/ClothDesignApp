import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppContext } from '../../authify/context/AppContext';
import authClient from '../../services/authClient';
import { API_ENDPOINTS } from '../../config/api.config';

// ─── Reusable row components ─────────────────────────────────────────────────

interface SectionProps {
  title: string;
  children: React.ReactNode;
  colors: any;
}

const Section: React.FC<SectionProps> = ({ title, children, colors }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: colors.grayLight }]}>{title}</Text>
    <View style={[styles.sectionCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
      {children}
    </View>
  </View>
);

interface RowProps {
  icon: string;
  label: string;
  sub?: string;
  colors: any;
  onPress?: () => void;
  right?: React.ReactNode;
  isLast?: boolean;
  destructive?: boolean;
}

const Row: React.FC<RowProps> = ({ icon, label, sub, colors, onPress, right, isLast, destructive }) => (
  <TouchableOpacity
    style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress && !right}
  >
    <View style={[styles.rowIconBox, { backgroundColor: destructive ? 'rgba(255,100,100,0.08)' : 'rgba(212,175,55,0.08)' }]}>
      <Text style={[styles.rowIcon, { color: destructive ? '#FF6B6B' : colors.gold }]}>{icon}</Text>
    </View>
    <View style={styles.rowBody}>
      <Text style={[styles.rowLabel, { color: destructive ? '#FF6B6B' : colors.offWhite }]}>{label}</Text>
      {sub && <Text style={[styles.rowSub, { color: colors.grayLight }]}>{sub}</Text>}
    </View>
    {right ?? (onPress && !destructive && (
      <Text style={[styles.rowChevron, { color: colors.gray }]}>›</Text>
    ))}
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const SettingsScreen: React.FC = () => {
  const { isDark, colors, toggleTheme } = useTheme();
  const { userData, setIsLoggedIn, setUserData, clearToken } = useAppContext();
  const navigation = useNavigation<any>();

  const initial = (userData?.name?.[0] ?? 'D').toUpperCase();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try { await authClient.post(API_ENDPOINTS.AUTH.LOGOUT); } catch (_) {}
          await clearToken();
          setIsLoggedIn(false);
          setUserData(null);
        },
      },
    ]);
  };

  const handleVerifyEmail = async () => {
    try {
      await authClient.post(API_ENDPOINTS.AUTH.SEND_OTP);
      navigation.navigate('EmailVerify');
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <SafeAreaView edges={['top']} style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.offWhite }]}>Settings</Text>
        <View style={[styles.headerDot, { backgroundColor: colors.gold }]} />
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <View style={[styles.profileCornerTL, { borderColor: colors.gold }]} />
          <View style={[styles.profileCornerBR, { borderColor: colors.gold }]} />

          <View style={[styles.avatarBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.avatarText, { color: colors.gold }]}>{initial}</Text>
            <View style={[styles.avatarRing, { borderColor: colors.goldDim }]} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.offWhite }]}>
              {userData?.name ?? 'Designer'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.grayLight }]}>
              {userData?.email ?? ''}
            </Text>
            {!userData?.isAccountVerified && (
              <View style={[styles.unverifiedBadge, { backgroundColor: 'rgba(255,180,50,0.1)', borderColor: 'rgba(255,180,50,0.3)' }]}>
                <Text style={styles.unverifiedText}>✉ Email not verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Account */}
        <Section title="ACCOUNT" colors={colors}>
          {!userData?.isAccountVerified && (
            <Row
              icon="✉"
              label="Verify Email"
              sub="Confirm your email address"
              colors={colors}
              onPress={handleVerifyEmail}
            />
          )}
          <Row
            icon="◎"
            label="Email"
            sub={userData?.email ?? '—'}
            colors={colors}
            isLast
          />
        </Section>

        {/* Appearance */}
        <Section title="APPEARANCE" colors={colors}>
          <Row
            icon={isDark ? '◐' : '○'}
            label={isDark ? 'Dark Mode' : 'Light Mode'}
            sub={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            colors={colors}
            isLast
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.goldDim }}
                thumbColor={isDark ? colors.gold : colors.gray}
              />
            }
          />
        </Section>

        {/* About */}
        <Section title="ABOUT" colors={colors}>
          <Row
            icon="◈"
            label="Fashion Sketch"
            sub="Version 1.0.0"
            colors={colors}
            isLast
          />
        </Section>

        {/* Sign out */}
        <Section title="SESSION" colors={colors}>
          <Row
            icon="↩"
            label="Sign Out"
            colors={colors}
            onPress={handleLogout}
            isLast
            destructive
          />
        </Section>

        <Text style={[styles.footer, { color: colors.gray }]}>
          © 2026 Fashion Sketch · All rights reserved
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '600', letterSpacing: 0.3 },
  headerDot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },

  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 48 },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    gap: 14,
    position: 'relative',
  },
  profileCornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: 20, height: 20,
    borderTopWidth: 1.5, borderLeftWidth: 1.5,
    borderTopLeftRadius: 16,
  },
  profileCornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: 20, height: 20,
    borderBottomWidth: 1.5, borderRightWidth: 1.5,
    borderBottomRightRadius: 16,
  },
  avatarBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: { fontSize: 20, fontWeight: '700' },
  avatarRing: {
    position: 'absolute',
    top: -2, left: -2, right: -2, bottom: -2,
    borderRadius: 28,
    borderWidth: 1.5,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '600', letterSpacing: 0.2, marginBottom: 2 },
  profileEmail: { fontSize: 12, letterSpacing: 0.3, marginBottom: 6 },
  unverifiedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  unverifiedText: { fontSize: 10, color: '#FFB432', letterSpacing: 0.3 },

  // Section
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  rowIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIcon: { fontSize: 16 },
  rowBody: { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '500', letterSpacing: 0.2 },
  rowSub: { fontSize: 11, marginTop: 1, letterSpacing: 0.2 },
  rowChevron: { fontSize: 20, marginRight: -2 },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 0.3,
    marginTop: 12,
  },
});

export default SettingsScreen;
