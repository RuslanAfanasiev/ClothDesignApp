import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store';
import { fetchProjects, selectProject } from '../../store/slices/projectsSlice';
import { Colors } from '../../theme/colors';
import AppHeader from '../../components/AppHeader';
import SketchCard from './components/SketchCard';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { items, loading, error } = useSelector((s: RootState) => s.projects);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleProjectPress = (id: string) => {
    dispatch(selectProject(id));
    navigation.navigate('Canvas');
  };

  const handleRefresh = () => {
    dispatch(fetchProjects());
  };

  const ListHeader = (
    <View>
      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
          ]}
        >
          Recent Projects
        </Text>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionCount}>{items.length}</Text>
      </View>
    </View>
  );

  const ListEmpty = (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator color={Colors.gold} size="large" />
      ) : error ? (
        <>
          <Text style={styles.emptyIcon}>⚠</Text>
          <Text style={styles.emptyTitle}>Could not load projects</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.emptyIcon}>◈</Text>
          <Text
            style={[
              styles.emptyTitle,
              fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
            ]}
          >
            No collections yet
          </Text>
          <Text style={styles.emptySubtitle}>
            Start your first fashion project above
          </Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <AppHeader />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SketchCard
            project={item}
            onPress={handleProjectPress}
            fontsLoaded={!!fontsLoaded}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={Colors.gold}
            colors={[Colors.gold]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topAccent: {
    height: 1,
    marginHorizontal: 48,
    backgroundColor: Colors.goldDim,
    opacity: 0.4,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.offWhite,
    fontSize: 20,
    letterSpacing: 0.3,
    marginRight: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginRight: 10,
  },
  sectionCount: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    backgroundColor: 'rgba(212,175,55,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.2)',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    color: Colors.border,
    marginBottom: 16,
  },
  emptyTitle: {
    color: Colors.offWhite,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: Colors.grayLight,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  retryText: {
    color: Colors.gold,
    fontSize: 13,
    letterSpacing: 1,
  },
});

export default DashboardScreen;
