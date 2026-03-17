import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  Switch,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store';
import { fetchTemplates, createTemplate, deleteTemplate } from '../../store/slices/templatesSlice';
import { setProjectTemplate } from '../../store/slices/canvasSlice';
import { Template } from '../../services/templateService';
import { useTheme } from '../../theme/ThemeContext';
import AppHeader from '../../components/AppHeader';

// ─── Create Modal ─────────────────────────────────────────────────────────────

interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<CreateModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName('');
    setImageUrl('');
    setDescription('');
    setCategory('');
    setIsPublic(false);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await dispatch(createTemplate({
        name: name.trim(),
        imageUrl: imageUrl.trim() || undefined,
        description: description.trim() || undefined,
        category: category.trim() || undefined,
        isPublic,
      }));
      reset();
      onClose();
    } catch {
      Alert.alert('Error', 'Could not create template.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { reset(); onClose(); };

  const opt = (label: string) => (
    <Text style={{ color: colors.gray, textTransform: 'none', fontSize: 10, letterSpacing: 0 }}>
      {' '}({label})
    </Text>
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[modalStyles.overlay, { backgroundColor: colors.overlay }]}
      >
        <View style={[modalStyles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <View style={[modalStyles.cornerTL, { borderColor: colors.gold }]} />
          <View style={[modalStyles.cornerBR, { borderColor: colors.gold }]} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[modalStyles.title, { color: colors.offWhite }]}>New Template</Text>
            <View style={[modalStyles.divider, { backgroundColor: colors.border }]} />

            <Text style={[modalStyles.label, { color: colors.grayLight }]}>Template Name</Text>
            <TextInput
              style={[modalStyles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Business Suit Base"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
            />

            <Text style={[modalStyles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Image URL{opt('paste a link to your sketch image')}
            </Text>
            <TextInput
              style={[modalStyles.input, { backgroundColor: colors.surface, borderColor: imageUrl.trim() ? colors.gold : colors.border, color: colors.offWhite }]}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="https://example.com/sketch.jpg"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {imageUrl.trim() ? (
              <Image
                source={{ uri: imageUrl.trim() }}
                style={[modalStyles.imagePreview, { borderColor: colors.border }]}
                resizeMode="contain"
              />
            ) : null}

            <Text style={[modalStyles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Category{opt('optional')}
            </Text>
            <TextInput
              style={[modalStyles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={category}
              onChangeText={setCategory}
              placeholder="e.g. Formal, Casual, Bridal"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
            />

            <Text style={[modalStyles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Description{opt('optional')}
            </Text>
            <TextInput
              style={[modalStyles.input, modalStyles.inputMultiline, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description of this template..."
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={2}
              selectionColor={colors.gold}
            />

            <View style={modalStyles.switchRow}>
              <Text style={[modalStyles.label, { color: colors.grayLight, marginTop: 0 }]}>Public Template</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: colors.border, true: colors.goldDim }}
                thumbColor={isPublic ? colors.gold : colors.gray}
              />
            </View>

            <View style={modalStyles.actions}>
              <TouchableOpacity onPress={handleClose} style={[modalStyles.cancelBtn, { borderColor: colors.border }]}>
                <Text style={[modalStyles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreate} disabled={!name.trim() || loading} activeOpacity={0.85}>
                <LinearGradient
                  colors={name.trim() ? [colors.goldLight, colors.gold] : [colors.gray, colors.gray]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={modalStyles.createBtn}
                >
                  {loading
                    ? <ActivityIndicator color={colors.background} size="small" />
                    : <Text style={[modalStyles.createText, { color: colors.background }]}>Create</Text>
                  }
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  card: { width: '100%', maxHeight: '90%', borderRadius: 20, padding: 24, borderWidth: 1, position: 'relative' },
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 28, height: 28, borderTopWidth: 1.5, borderLeftWidth: 1.5, borderTopLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderBottomWidth: 1.5, borderRightWidth: 1.5, borderBottomRightRadius: 20 },
  title: { fontSize: 22, marginBottom: 12, letterSpacing: 0.3 },
  divider: { height: 1, marginBottom: 20 },
  label: { fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 },
  input: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14 },
  inputMultiline: { height: 64, textAlignVertical: 'top', paddingTop: 12 },
  imagePreview: { width: '100%', height: 140, borderRadius: 10, borderWidth: 1, marginTop: 8 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
  cancelBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
  cancelText: { fontSize: 13, letterSpacing: 0.5 },
  createBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, minWidth: 80, alignItems: 'center' },
  createText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────

const TemplatesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const selectedProjectId = useSelector((state: RootState) => state.projects.selectedId);
  const selectedProject = useSelector(
    (state: RootState) => state.projects.items.find((p) => p.id === selectedProjectId),
    shallowEqual,
  );
  const templates = useSelector((state: RootState) => state.templates.items, shallowEqual);
  const loading = useSelector((state: RootState) => state.templates.loading);
  const error = useSelector((state: RootState) => state.templates.error);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  const handleUse = (template: Template) => {
    if (!selectedProjectId) {
      Alert.alert('No Project Selected', 'Select a project from the Projects tab first.');
      return;
    }
    dispatch(setProjectTemplate({ projectId: selectedProjectId, templateUrl: template.imageUrl ?? null }));
    navigation.navigate('Canvas');
  };

  const handleDelete = (template: Template) => {
    Alert.alert('Delete Template', `Delete "${template.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTemplate(template.id)) },
    ]);
  };

  const renderCard = ({ item }: { item: Template }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
      onLongPress={() => handleDelete(item)}
      delayLongPress={500}
      activeOpacity={0.85}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.cardThumbImage} resizeMode="cover" />
      ) : (
        <View style={[styles.cardThumb, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardThumbIcon, { color: colors.border }]}>◈</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        {item.category ? (
          <View style={[styles.categoryBadge, { backgroundColor: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.2)' }]}>
            <Text style={[styles.categoryText, { color: colors.gold }]}>{item.category}</Text>
          </View>
        ) : null}
        <Text style={[styles.cardName, { color: colors.offWhite }]} numberOfLines={1}>{item.name}</Text>
        {item.description ? (
          <Text style={[styles.cardDesc, { color: colors.grayLight }]} numberOfLines={2}>{item.description}</Text>
        ) : null}
        {item.isPublic && (
          <Text style={[styles.publicBadge, { color: colors.grayLight }]}>◎ Public</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.useBtn, { borderColor: colors.gold }]}
        onPress={() => handleUse(item)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.useBtnGradient}
        >
          <Text style={[styles.useBtnText, { color: colors.background }]}>Use</Text>
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setCreateModalVisible(true)} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.fabIcon, { color: colors.background }]}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <CreateTemplateModal visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
    </View>
  );
};

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

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardThumb: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  cardThumbImage: { width: 80, height: 80 },
  cardThumbIcon: { fontSize: 28 },
  cardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'center' },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 4,
  },
  categoryText: { fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },
  cardName: { fontSize: 14, fontWeight: '600', letterSpacing: 0.2, marginBottom: 2 },
  cardDesc: { fontSize: 11, letterSpacing: 0.2, lineHeight: 15 },
  publicBadge: { fontSize: 10, marginTop: 3, letterSpacing: 0.3 },

  useBtn: { marginRight: 12, borderRadius: 10, overflow: 'hidden', borderWidth: 1 },
  useBtnGradient: { paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center', minWidth: 48 },
  useBtnText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },

  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emptyHint: { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  errorText: { textAlign: 'center', fontSize: 13, marginTop: 16, paddingHorizontal: 24 },

  fab: { position: 'absolute', bottom: 90, right: 20 },
  fabGradient: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
  fabIcon: { fontSize: 28, fontWeight: '300', lineHeight: 32, marginTop: -2 },
});

export default TemplatesScreen;
