import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { AppColors } from '../theme/colors';
import DashboardScreen from '../pages/dashboard/DashboardScreen';
import SettingsScreen from '../pages/settings/SettingsScreen';
import SketchesScreen from '../pages/sketch/SketchesScreen';
import TemplatesScreen from '../pages/templates/TemplatesScreen';
import { AppDispatch } from '../store';
import { createProject } from '../store/slices/projectsSlice';

const Tab = createBottomTabNavigator();

// ─── Tab icon ────────────────────────────────────────────────────────────────
interface TabIconProps {
  icon: string;
  label: string;
  focused: boolean;
  colors: AppColors;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, focused, colors }) => (
  <View style={tabStyles.iconWrapper}>
    <Text style={[tabStyles.icon, { color: focused ? colors.gold : colors.grayLight }]}>{icon}</Text>
    <Text style={[tabStyles.label, { color: focused ? colors.gold : colors.grayLight }]}>{label}</Text>
    {focused && <View style={[tabStyles.activeDot, { backgroundColor: colors.gold }]} />}
  </View>
);

const tabStyles = StyleSheet.create({
  iconWrapper: { alignItems: 'center', paddingTop: 8, minWidth: 64 },
  icon: { fontSize: 20, marginBottom: 3 },
  label: { fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },
  activeDot: { position: 'absolute', bottom: -6, width: 4, height: 4, borderRadius: 2 },
});

// ─── Center FAB ───────────────────────────────────────────────────────────────
const CenterFAB: React.FC<{ onPress: () => void; colors: AppColors }> = ({ onPress, colors }) => (
  <TouchableOpacity style={fabStyles.wrapper} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient
      colors={[colors.goldLight, colors.gold]}
      style={fabStyles.circle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={[fabStyles.plus, { color: colors.background }]}>+</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const fabStyles = StyleSheet.create({
  wrapper: { top: -22, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 58, height: 58, borderRadius: 29,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45, shadowRadius: 12, elevation: 10,
  },
  plus: { fontSize: 30, fontWeight: '300', lineHeight: 34, marginTop: -2 },
});

// ─── Create Project Modal ─────────────────────────────────────────────────────
interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
  colors: AppColors;
}

const CreateProjectModal: React.FC<CreateModalProps> = ({ visible, onClose, colors }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await dispatch(createProject({ name: name.trim(), description: description.trim() }));
    setLoading(false);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[modalStyles.overlay, { backgroundColor: colors.overlay }]}
      >
        <View style={[modalStyles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <View style={[modalStyles.cornerTL, { borderColor: colors.gold }]} />
          <View style={[modalStyles.cornerBR, { borderColor: colors.gold }]} />

          <Text style={[modalStyles.title, { color: colors.offWhite }]}>New Collection</Text>
          <View style={[modalStyles.divider, { backgroundColor: colors.border }]} />

          <Text style={[modalStyles.label, { color: colors.grayLight }]}>Project Name</Text>
          <TextInput
            style={[modalStyles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Summer Couture 2026"
            placeholderTextColor={colors.gray}
            selectionColor={colors.gold}
          />

          <Text style={[modalStyles.label, { color: colors.grayLight, marginTop: 12 }]}>
            Description <Text style={[modalStyles.labelOptional, { color: colors.gray }]}>(optional)</Text>
          </Text>
          <TextInput
            style={[modalStyles.input, modalStyles.inputMultiline, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Brief description..."
            placeholderTextColor={colors.gray}
            multiline
            numberOfLines={2}
            selectionColor={colors.gold}
          />

          <View style={modalStyles.actions}>
            <TouchableOpacity onPress={onClose} style={[modalStyles.cancelBtn, { borderColor: colors.border }]}>
              <Text style={[modalStyles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreate} disabled={!name.trim() || loading} activeOpacity={0.85}>
              <LinearGradient
                colors={name.trim() ? [colors.goldLight, colors.gold] : [colors.gray, colors.gray]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={modalStyles.createBtn}
              >
                {loading ? (
                  <ActivityIndicator color={colors.background} size="small" />
                ) : (
                  <Text style={[modalStyles.createText, { color: colors.background }]}>Create</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  card: { width: '100%', borderRadius: 20, padding: 24, borderWidth: 1, position: 'relative' },
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 28, height: 28, borderTopWidth: 1.5, borderLeftWidth: 1.5, borderTopLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderBottomWidth: 1.5, borderRightWidth: 1.5, borderBottomRightRadius: 20 },
  title: { fontSize: 22, marginBottom: 12, letterSpacing: 0.3 },
  divider: { height: 1, marginBottom: 20 },
  label: { fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 },
  labelOptional: { fontSize: 10, textTransform: 'none', letterSpacing: 0 },
  input: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14 },
  inputMultiline: { height: 64, textAlignVertical: 'top', paddingTop: 12 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
  cancelBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
  cancelText: { fontSize: 13, letterSpacing: 0.5 },
  createBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, minWidth: 80, alignItems: 'center' },
  createText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
});

const EmptyScreen = () => null;

// ─── Tab Navigator ────────────────────────────────────────────────────────────
const TabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 80 : 64,
            backgroundColor: colors.surfaceElevated,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            elevation: 0,
            shadowColor: colors.gold,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={40}
              tint={isDark ? 'dark' : 'light'}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          ),
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Projects"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="⊞" label="Projects" focused={focused} colors={colors} />
            ),
          }}
        />
        <Tab.Screen
          name="Templates"
          component={TemplatesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="◧" label="Templates" focused={focused} colors={colors} />
            ),
          }}
        />

        <Tab.Screen
          name="New"
          component={EmptyScreen}
          options={{
            tabBarButton: () => (
              <CenterFAB onPress={() => setModalVisible(true)} colors={colors} />
            ),
          }}
        />

        <Tab.Screen
          name="Sketches"
          component={SketchesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="✏" label="Sketches" focused={focused} colors={colors} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="⚙" label="Settings" focused={focused} colors={colors} />
            ),
          }}
        />
      </Tab.Navigator>

      <CreateProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        colors={colors}
      />
    </>
  );
};

export default TabNavigator;
