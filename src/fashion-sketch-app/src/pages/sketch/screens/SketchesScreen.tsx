import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import AppHeader from '../../../components/AppHeader';
import SketchCard from '../components/SketchCard';
import { SketchesProvider, useSketchesContext } from '../context/SketchesContext';

// ─── Inner screen (uses context) ──────────────────────────────────────────────

const SketchesScreenInner: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<any>();
  const {
    project,
    sketches,
    loading,
    error,
    handleRefresh,
    handleOpenCanvas,
    handleDelete,
    handleNewCanvas,
    selectedId,
  } = useSketchesContext();

  // ── Loading skeleton ───────────────────────────────────────────────────────
  const renderSkeleton = () => (
    <>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.skeletonCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={[styles.skeletonThumb, { backgroundColor: colors.surfaceElevated }]} />
          <View style={styles.skeletonInfo}>
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '60%' }]} />
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '35%', marginTop: 8 }]} />
          </View>
        </View>
      ))}
    </>
  );

  // ── Empty states ───────────────────────────────────────────────────────────
  const renderEmpty = () => {
    if (loading) return null;

    if (error) return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyIcon, { color: colors.border }]}>⚠</Text>
        <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>Could not load sketches</Text>
        <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>{error}</Text>
        <TouchableOpacity onPress={handleRefresh} style={[styles.actionBtn, { borderColor: colors.gold }]}>
          <Text style={[styles.actionBtnText, { color: colors.gold }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );

    if (!selectedId) return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyIcon, { color: colors.border }]}>◈</Text>
        <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>No project selected</Text>
        <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>
          Go to Projects tab and tap a project to see its sketches here
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Main', { screen: 'Projects' })}
          style={[styles.actionBtn, { borderColor: colors.gold }]}
        >
          <Text style={[styles.actionBtnText, { color: colors.gold }]}>Go to Projects</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyIcon, { color: colors.border }]}>✏</Text>
        <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>No sketches yet</Text>
        <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>
          Open the canvas and start drawing your first sketch for this project
        </Text>
        <TouchableOpacity
          onPress={handleNewCanvas}
          style={[styles.actionBtnFilled, { backgroundColor: colors.gold }]}
        >
          <Text style={[styles.actionBtnFilledText, { color: colors.background }]}>Open Canvas</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <AppHeader />

      <FlatList
        data={loading ? [] : sketches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SketchCard
            sketch={item}
            onPress={handleOpenCanvas}
            onLongPress={handleDelete}
          />
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.offWhite }]}>
                {project ? project.name : 'Sketches'}
              </Text>
              <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
              {!loading && (
                <Text style={[styles.sectionCount, { color: colors.gold, borderColor: 'rgba(212,175,55,0.2)' }]}>
                  {sketches.length}
                </Text>
              )}
            </View>
            {loading && renderSkeleton()}
          </View>
        }
        ListEmptyComponent={renderEmpty()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={colors.gold}
            colors={[colors.gold]}
          />
        }
      />
    </View>
  );
};

// ─── Export: wraps inner screen with provider ─────────────────────────────────

const SketchesScreen: React.FC = () => (
  <SketchesProvider>
    <SketchesScreenInner />
  </SketchesProvider>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 100, paddingHorizontal: 16 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 20, letterSpacing: 0.3, marginRight: 12, fontWeight: '600' },
  sectionLine: { flex: 1, height: 1, marginRight: 10 },
  sectionCount: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    backgroundColor: 'rgba(212,175,55,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },

  skeletonCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    opacity: 0.6,
  },
  skeletonThumb: { width: 100, height: 100 },
  skeletonInfo: { flex: 1, paddingHorizontal: 14, paddingVertical: 16 },
  skeletonLine: { height: 12, borderRadius: 6 },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 52, marginBottom: 16 },
  emptyTitle: { fontSize: 20, marginBottom: 8, textAlign: 'center', fontWeight: '600' },
  emptySubtitle: { fontSize: 13, textAlign: 'center', letterSpacing: 0.3, lineHeight: 20, marginBottom: 24 },
  actionBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  actionBtnText: { fontSize: 13, letterSpacing: 1 },
  actionBtnFilled: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 20,
  },
  actionBtnFilledText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.8 },
});

export default SketchesScreen;
