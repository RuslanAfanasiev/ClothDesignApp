import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme/ThemeContext';
import AppHeader from '../../../components/AppHeader';
import TemplateCard from '../components/TemplateCard';
import CreateTemplateModal from '../components/CreateTemplateModal';
import { TemplatesProvider, useTemplatesContext } from '../context/TemplatesContext';
import { Template } from '../../../services/templateService';

// ─── Inner screen (uses context) ──────────────────────────────────────────────

const TemplatesScreenInner: React.FC = () => {
  const { colors, isDark } = useTheme();
  const {
    templates,
    loading,
    error,
    selectedProject,
    createModalVisible,
    setCreateModalVisible,
    handleUse,
    handleDelete,
  } = useTemplatesContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <AppHeader />

      {selectedProject && (
        <View style={[styles.contextBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.contextText, { color: colors.grayLight }]}>
            Applying to: <Text style={{ color: colors.gold }}>{selectedProject.name}</Text>
          </Text>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.offWhite }]}>Templates</Text>
        <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.sectionCount, { color: colors.gold, borderColor: 'rgba(212,175,55,0.2)' }]}>
          {templates.length}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.gold} style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={[styles.errorText, { color: colors.grayLight }]}>{error}</Text>
      ) : templates.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>◈</Text>
          <Text style={[styles.emptyText, { color: colors.offWhite }]}>No templates yet</Text>
          <Text style={[styles.emptyHint, { color: colors.grayLight }]}>
            Tap + to create your first template with an image link
          </Text>
        </View>
      ) : (
        <FlatList<Template>
          data={templates}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TemplateCard
              template={item}
              onUse={handleUse}
              onLongPress={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCreateModalVisible(true)}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.fabIcon, { color: colors.background }]}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <CreateTemplateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </View>
  );
};

// ─── Export: wraps inner screen with provider ─────────────────────────────────

const TemplatesScreen: React.FC = () => (
  <TemplatesProvider>
    <TemplatesScreenInner />
  </TemplatesProvider>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },

  contextBanner: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  contextText: { fontSize: 12, letterSpacing: 0.3 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3, marginRight: 10 },
  sectionLine: { flex: 1, height: 1, marginRight: 8 },
  sectionCount: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    backgroundColor: 'rgba(212,175,55,0.08)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },

  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emptyHint: { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  errorText: { textAlign: 'center', fontSize: 13, marginTop: 16, paddingHorizontal: 24 },

  fab: { position: 'absolute', bottom: 90, right: 20 },
  fabGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabIcon: { fontSize: 28, fontWeight: '300', lineHeight: 32, marginTop: -2 },
});

export default TemplatesScreen;
