import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
} from '@expo-google-fonts/playfair-display';
import { useTheme } from '../../../theme/ThemeContext';
import AppHeader from '../../../components/AppHeader';
import ProjectCard from '../components/ProjectCard';
import { ProjectsProvider, useProjectsContext, FILTERS } from '../context/ProjectsContext';

// ─── Inner screen (uses context) ──────────────────────────────────────────────

const ProjectsScreenInner: React.FC = () => {
  const { colors, isDark } = useTheme();
  const {
    loading,
    error,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filtered,
    handleProjectPress,
    handleRefresh,
  } = useProjectsContext();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
  });

  // ── Skeleton ────────────────────────────────────────────────────────────────
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
          <View style={[styles.skeletonPreview, { backgroundColor: colors.surfaceElevated }]} />
          <View style={styles.skeletonBody}>
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '55%' }]} />
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '35%', marginTop: 8 }]} />
          </View>
        </View>
      ))}
    </>
  );

  // ── Empty / error state ──────────────────────────────────────────────────────
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {error ? (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>⚠</Text>
          <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>Could not load projects</Text>
          <Text style={[styles.emptySub, { color: colors.grayLight }]}>{error}</Text>
          <TouchableOpacity
            onPress={handleRefresh}
            style={[styles.emptyBtn, { borderColor: colors.gold }]}
          >
            <Text style={[styles.emptyBtnText, { color: colors.gold }]}>Retry</Text>
          </TouchableOpacity>
        </>
      ) : search || activeFilter !== 'ALL' ? (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>◌</Text>
          <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>No results</Text>
          <Text style={[styles.emptySub, { color: colors.grayLight }]}>
            Try a different search or filter
          </Text>
          <TouchableOpacity
            onPress={() => { setSearch(''); setActiveFilter('ALL'); }}
            style={[styles.emptyBtn, { borderColor: colors.border }]}
          >
            <Text style={[styles.emptyBtnText, { color: colors.grayLight }]}>Clear filters</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>◈</Text>
          <Text
            style={[
              styles.emptyTitle,
              { color: colors.offWhite },
              fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
            ]}
          >
            No collections yet
          </Text>
          <Text style={[styles.emptySub, { color: colors.grayLight }]}>
            Tap the button below to start your first fashion project
          </Text>
        </>
      )}
    </View>
  );

  // ── List header ──────────────────────────────────────────────────────────────
  const ListHeader = (
    <View>
      <View style={styles.topSpacing} />

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.searchIcon, { color: colors.grayLight }]}>⌕</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.offWhite }]}
          placeholder="Search projects..."
          placeholderTextColor={colors.gray}
          value={search}
          onChangeText={setSearch}
          selectionColor={colors.gold}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={[styles.searchClear, { color: colors.grayLight }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setActiveFilter(f.key)}
              style={[
                styles.filterChip,
                { borderColor: isActive ? colors.gold : colors.border },
                isActive && { backgroundColor: 'rgba(212,175,55,0.12)' },
              ]}
              activeOpacity={0.75}
            >
              {isActive && <View style={[styles.filterDot, { backgroundColor: colors.gold }]} />}
              <Text style={[styles.filterLabel, { color: isActive ? colors.gold : colors.grayLight }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.offWhite },
            fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
          ]}
        >
          Projects
        </Text>
        <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
        <Text
          style={[
            styles.sectionCount,
            { color: colors.gold, borderColor: 'rgba(212,175,55,0.2)' },
          ]}
        >
          {filtered.length}
        </Text>
      </View>

      {loading && renderSkeleton()}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <AppHeader />
      <FlatList
        data={loading ? [] : filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={handleProjectPress}
            fontsLoaded={!!fontsLoaded}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={loading ? null : renderEmpty()}
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

const ProjectsScreen: React.FC = () => (
  <ProjectsProvider>
    <ProjectsScreenInner />
  </ProjectsProvider>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  listContent: { paddingBottom: 100 },
  topSpacing: { height: 16 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 24, marginBottom: 12,
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 12, paddingVertical: 10, gap: 8,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 14, letterSpacing: 0.2, padding: 0 },
  searchClear: { fontSize: 13, paddingHorizontal: 4 },

  filterRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 8, marginBottom: 18 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, gap: 5,
  },
  filterDot: { width: 5, height: 5, borderRadius: 3 },
  filterLabel: { fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase' },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24, marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, letterSpacing: 0.3, marginRight: 12 },
  sectionLine: { flex: 1, height: 1, marginRight: 10 },
  sectionCount: {
    fontSize: 12, fontWeight: '700', letterSpacing: 0.5,
    backgroundColor: 'rgba(212,175,55,0.1)',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 10, borderWidth: 1,
  },

  emptyContainer: { alignItems: 'center', paddingTop: 48, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, marginBottom: 8, textAlign: 'center' },
  emptySub: { fontSize: 13, textAlign: 'center', letterSpacing: 0.3, lineHeight: 20 },
  emptyBtn: { marginTop: 20, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, borderWidth: 1 },
  emptyBtnText: { fontSize: 13, letterSpacing: 1 },

  skeletonCard: { marginHorizontal: 24, marginBottom: 16, borderRadius: 16, borderWidth: 1, overflow: 'hidden', opacity: 0.5 },
  skeletonPreview: { height: 160 },
  skeletonBody: { padding: 14 },
  skeletonLine: { height: 12, borderRadius: 6 },
});

export default ProjectsScreen;
