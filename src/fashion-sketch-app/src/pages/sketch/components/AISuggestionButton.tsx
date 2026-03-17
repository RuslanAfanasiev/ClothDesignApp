import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import {
  setAISuggesting,
  fetchAISuggestions,
  clearAISuggestions,
} from '../../../store/slices/canvasSlice';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  currentSketchImageUrl?: string;
  projectName?: string;
}

const AISuggestionButton: React.FC<Props> = ({ currentSketchImageUrl, projectName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAISuggesting = useSelector((state: RootState) => state.canvas.isAISuggesting);
  const suggestions = useSelector((state: RootState) => state.canvas.aiSuggestions);
  const loading = useSelector((state: RootState) => state.canvas.aiSuggestionsLoading);
  const error = useSelector((state: RootState) => state.canvas.aiSuggestionsError);
  const { colors } = useTheme();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAISuggesting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
      ).start();
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      rotateAnim.stopAnimation();
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isAISuggesting]);

  const rotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const handlePress = () => {
    if (isAISuggesting) {
      dispatch(setAISuggesting(false));
      return;
    }
    dispatch(setAISuggesting(true));
    dispatch(
      fetchAISuggestions({
        imageUrl: currentSketchImageUrl,
        context: projectName ? `Proiect: ${projectName}` : undefined,
      }),
    );
  };

  const handleClose = () => {
    dispatch(setAISuggesting(false));
    dispatch(clearAISuggestions());
  };

  return (
    <>
      <Animated.View style={[styles.wrapper, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
          <LinearGradient
            colors={[colors.goldLight, colors.gold, colors.goldDim]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button, { shadowColor: colors.gold }]}
          >
            <Animated.Text style={[styles.icon, { color: colors.background, transform: [{ rotate }] }]}>
              ✦
            </Animated.Text>
            <Text style={[styles.label, { color: colors.background }]}>AI</Text>
          </LinearGradient>
        </TouchableOpacity>

        {isAISuggesting && (
          <View style={[styles.badge, { borderColor: colors.background }]}>
            <Text style={[styles.badgeText, { color: colors.background }]}>●</Text>
          </View>
        )}
      </Animated.View>

      {/* Suggestions Modal */}
      <Modal
        visible={isAISuggesting && (loading || suggestions.length > 0 || !!error)}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <View style={[styles.modalCornerTL, { borderColor: colors.gold }]} />
            <View style={[styles.modalCornerBR, { borderColor: colors.gold }]} />

            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.offWhite }]}>✦ AI Suggestions</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Text style={[styles.closeBtnText, { color: colors.grayLight }]}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.gold} size="large" />
                <Text style={[styles.loadingText, { color: colors.grayLight }]}>
                  Analizeaza schita...
                </Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorIcon, { color: colors.border }]}>⚠</Text>
                <Text style={[styles.errorText, { color: colors.grayLight }]}>{error}</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {suggestions.map((s, i) => (
                  <View
                    key={i}
                    style={[styles.suggestionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  >
                    <View style={[styles.categoryBadge, { backgroundColor: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.3)' }]}>
                      <Text style={[styles.categoryText, { color: colors.gold }]}>{s.category}</Text>
                    </View>
                    <Text style={[styles.suggestionText, { color: colors.offWhite }]}>{s.suggestion}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 24,
    top: '38%',
    zIndex: 10,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: { fontSize: 16, fontWeight: 'bold' },
  label: { fontSize: 9, fontWeight: '700', letterSpacing: 1, marginTop: 1 },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3DFF8F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  badgeText: { fontSize: 6 },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    maxHeight: '70%',
    position: 'relative',
  },
  modalCornerTL: { position: 'absolute', top: 0, left: 0, width: 24, height: 24, borderTopWidth: 1.5, borderLeftWidth: 1.5, borderTopLeftRadius: 20 },
  modalCornerBR: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderBottomWidth: 1.5, borderRightWidth: 1.5, borderBottomRightRadius: 20 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: '600', letterSpacing: 0.3 },
  closeBtn: { padding: 4 },
  closeBtnText: { fontSize: 16 },
  divider: { height: 1, marginBottom: 16 },

  loadingContainer: { alignItems: 'center', paddingVertical: 24 },
  loadingText: { marginTop: 12, fontSize: 13, letterSpacing: 0.3 },

  errorContainer: { alignItems: 'center', paddingVertical: 24 },
  errorIcon: { fontSize: 36, marginBottom: 8 },
  errorText: { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  suggestionCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 8,
  },
  categoryText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  suggestionText: { fontSize: 13, lineHeight: 20, letterSpacing: 0.2 },
});

export default AISuggestionButton;
