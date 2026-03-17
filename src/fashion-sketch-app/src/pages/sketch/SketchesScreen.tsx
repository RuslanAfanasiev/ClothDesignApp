import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store';
import { fetchSketches, deleteSketch } from '../../store/slices/sketchesSlice';
import { setProjectTemplate } from '../../store/slices/canvasSlice';
import { Sketch } from '../../services/sketchService';
import { useTheme } from '../../theme/ThemeContext';
import AppHeader from '../../components/AppHeader';

const SketchesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();

  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const project = useSelector(
    (state: RootState) => state.projects.items.find((p) => p.id === selectedId),
    shallowEqual,
  );
  const sketches: Sketch[] = useSelector(
    (state: RootState) => {
      const list = selectedId ? (state.sketches.itemsByProject[selectedId] ?? []) : [];
      return [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    shallowEqual,
  );
  const loading = useSelector((state: RootState) => state.sketches.loading);
  const error = useSelector((state: RootState) => state.sketches.error);

  useEffect(() => {
    if (selectedId) dispatch(fetchSketches(selectedId));
  }, [selectedId]);

  const handleRefresh = useCallback(() => {
    if (selectedId) dispatch(fetchSketches(selectedId));
  }, [selectedId]);

  const handleOpenCanvas = (sketch: Sketch) => {
    if (!selectedId) return;
    dispatch(setProjectTemplate({
      projectId: selectedId,
      templateUrl: sketch.imageUrl ?? null,
    }));
    navigation.navigate('Canvas');
  };

  const handleLongPress = (sketch: Sketch) => {
    if (!selectedId) return;
    Alert.alert('Delete Sketch', `Delete "${sketch.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteSketch({ projectId: selectedId, sketchId: sketch.id })),
      },
    ]);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const renderSketch = ({ item }: { item: Sketch }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
      onPress={() => handleOpenCanvas(item)}
      onLongPress={() => handleLongPress(item)}
      activeOpacity={0.85}
      delayLongPress={500}
    >
      {/* Thumbnail */}
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.thumbnailPlaceholder, { backgroundColor: colors.surface }]}>
          <Text style={[styles.thumbnailIcon, { color: colors.border }]}>✏</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={[styles.cardName, { color: colors.offWhite }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.cardDate, { color: colors.gray }]}>
          {formatDate(item.createdAt)}
        </Text>
        {item.notes ? (
          <Text style={[styles.cardNotes, { color: colors.grayLight }]} numberOfLines={2}>
            {item.notes}
          </Text>
        ) : null}
      </View>

      {/* Continue drawing badge */}
      <View style={styles.editBadge}>
        <Text style={[styles.editBadgeIcon, { color: colors.gold }]}>✏</Text>
        <Text style={[styles.editBadgeText, { color: colors.gold }]}>Edit</Text>
      </View>
    </TouchableOpacity>
  );

  // ─── Loading skeleton ───────────────────────────────────────────────────────
  const renderSkeleton = () => (
    <>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[styles.card, styles.skeletonCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.skeletonThumb, { backgroundColor: colors.surfaceElevated }]} />
          <View style={styles.skeletonInfo}>
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '60%' }]} />
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '35%', marginTop: 8 }]} />
          </View>
        </View>
      ))}
    </>
  );

  // ─── Empty states ───────────────────────────────────────────────────────────
  const renderEmpty = () => {
    if (loading) return null; // show skeleton above list instead

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
          onPress={() => navigation.navigate('Canvas')}
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
        renderItem={renderSketch}
        ListHeaderComponent={
          <View>
            {/* Section header */}
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
            {/* Skeleton while loading */}
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

  // ── Card ──────────────────────────────────────────────────────────────────
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  thumbnail: { width: 100, height: 100 },
  thumbnailPlaceholder: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailIcon: { fontSize: 32 },
  cardInfo: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center' },
  cardName: { fontSize: 15, fontWeight: '600', marginBottom: 4, letterSpacing: 0.2 },
  cardDate: { fontSize: 11, letterSpacing: 0.3, marginBottom: 4 },
  cardNotes: { fontSize: 12, letterSpacing: 0.2, lineHeight: 16 },
  editBadge: {
    alignItems: 'center',
    paddingRight: 14,
    gap: 2,
  },
  editBadgeIcon: { fontSize: 16 },
  editBadgeText: { fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },

  // ── Skeleton ──────────────────────────────────────────────────────────────
  skeletonCard: { opacity: 0.6 },
  skeletonThumb: { width: 100, height: 100 },
  skeletonInfo: { flex: 1, paddingHorizontal: 14, paddingVertical: 16 },
  skeletonLine: { height: 12, borderRadius: 6 },

  // ── Empty states ──────────────────────────────────────────────────────────
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
