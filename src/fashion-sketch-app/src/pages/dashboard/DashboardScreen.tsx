import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
} from "@expo-google-fonts/playfair-display";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState, AppDispatch } from "../../store";
import {
  fetchProjects,
  selectProject,
  ProjectStatus,
} from "../../store/slices/projectsSlice";
import { useTheme } from "../../theme/ThemeContext";
import AppHeader from "../../components/AppHeader";
import SketchCard from "./components/SketchCard";

type FilterType = "ALL" | ProjectStatus;

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "DRAFT", label: "Draft" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "COMPLETED", label: "Completed" },
];

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { items, loading, error } = useSelector((s: RootState) => s.projects);
  const { colors, isDark } = useTheme();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const filtered = useMemo(() => {
    let list = [...items];
    if (activeFilter !== "ALL") {
      list = list.filter((p) => p.status === activeFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    list.sort((a, b) =>
      new Date(b.updatedAt ?? b.createdAt).getTime() -
      new Date(a.updatedAt ?? a.createdAt).getTime()
    );
    return list;
  }, [items, activeFilter, search]);

  const handleProjectPress = (id: string) => {
    dispatch(selectProject(id));
    navigation.navigate("Canvas");
  };

  const handleRefresh = () => {
    dispatch(fetchProjects());
  };

  const ListHeader = (
    <View>
      {/* Search bar */}
      <View
        style={[
          styles.searchWrapper,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
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
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={[styles.searchClear, { color: colors.grayLight }]}>
              ✕
            </Text>
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
                isActive && { backgroundColor: "rgba(212,175,55,0.12)" },
              ]}
              activeOpacity={0.75}
            >
              {isActive && (
                <View
                  style={[styles.filterDot, { backgroundColor: colors.gold }]}
                />
              )}
              <Text
                style={[
                  styles.filterLabel,
                  { color: isActive ? colors.gold : colors.grayLight },
                ]}
              >
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
            fontsLoaded && { fontFamily: "PlayfairDisplay_700Bold_Italic" },
          ]}
        >
          Projects
        </Text>
        <View
          style={[styles.sectionLine, { backgroundColor: colors.border }]}
        />
        <Text style={[styles.sectionCount, { color: colors.gold }]}>
          {filtered.length}
        </Text>
      </View>
    </View>
  );

  const renderSkeletonCards = () => (
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
          <View style={styles.skeletonContent}>
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '55%' }]} />
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '35%', marginTop: 8 }]} />
            <View style={[styles.skeletonLine, { backgroundColor: colors.surfaceElevated, width: '80%', marginTop: 8 }]} />
          </View>
        </View>
      ))}
    </>
  );

  const ListEmpty = (
    <View style={styles.emptyContainer}>
      {error ? (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>⚠</Text>
          <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>
            Could not load projects
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>
            {error}
          </Text>
          <TouchableOpacity
            onPress={handleRefresh}
            style={[styles.retryButton, { borderColor: colors.gold }]}
          >
            <Text style={[styles.retryText, { color: colors.gold }]}>Retry</Text>
          </TouchableOpacity>
        </>
      ) : search || activeFilter !== "ALL" ? (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>◌</Text>
          <Text style={[styles.emptyTitle, { color: colors.offWhite }]}>No results found</Text>
          <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>
            Try a different search or filter
          </Text>
          <TouchableOpacity
            onPress={() => { setSearch(""); setActiveFilter("ALL"); }}
            style={[styles.retryButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.retryText, { color: colors.grayLight }]}>Clear filters</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.emptyIcon, { color: colors.border }]}>◈</Text>
          <Text
            style={[
              styles.emptyTitle,
              { color: colors.offWhite },
              fontsLoaded && { fontFamily: "PlayfairDisplay_700Bold_Italic" },
            ]}
          >
            No collections yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.grayLight }]}>
            Tap the + button to start your first fashion project
          </Text>
        </>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <AppHeader />
      <FlatList
        data={loading && items.length === 0 ? [] : filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SketchCard
            project={item}
            onPress={handleProjectPress}
            fontsLoaded={!!fontsLoaded}
          />
        )}
        ListHeaderComponent={
          <View>
            {ListHeader}
            {loading && items.length === 0 && renderSkeletonCards()}
          </View>
        }
        ListEmptyComponent={loading && items.length === 0 ? null : ListEmpty}
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
  listContent: { paddingBottom: 100 },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 14,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 14, letterSpacing: 0.2, padding: 0 },
  searchClear: { fontSize: 13, paddingHorizontal: 4 },

  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 18,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterDot: { width: 5, height: 5, borderRadius: 3 },
  filterLabel: { fontSize: 11, letterSpacing: 0.8, textTransform: "uppercase" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, letterSpacing: 0.3, marginRight: 12 },
  sectionLine: { flex: 1, height: 1, marginRight: 10 },
  sectionCount: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    backgroundColor: "rgba(212,175,55,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, marginBottom: 8, textAlign: "center" },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  retryText: { fontSize: 13, letterSpacing: 1 },

  skeletonCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    opacity: 0.5,
  },
  skeletonPreview: { height: 120 },
  skeletonContent: { padding: 16 },
  skeletonLine: { height: 12, borderRadius: 6 },
});

export default DashboardScreen;
