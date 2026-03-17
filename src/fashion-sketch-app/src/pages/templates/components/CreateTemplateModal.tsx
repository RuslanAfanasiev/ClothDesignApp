import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Switch,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { createTemplate } from '../../../store/slices/templatesSlice';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<Props> = ({ visible, onClose }) => {
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
        style={[styles.overlay, { backgroundColor: colors.overlay }]}
      >
        <View style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <View style={[styles.cornerTL, { borderColor: colors.gold }]} />
          <View style={[styles.cornerBR, { borderColor: colors.gold }]} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: colors.offWhite }]}>New Template</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Text style={[styles.label, { color: colors.grayLight }]}>Template Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Business Suit Base"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
            />

            <Text style={[styles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Image URL{opt('paste a link to your sketch image')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: imageUrl.trim() ? colors.gold : colors.border, color: colors.offWhite }]}
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
                style={[styles.imagePreview, { borderColor: colors.border }]}
                resizeMode="contain"
              />
            ) : null}

            <Text style={[styles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Category{opt('optional')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={category}
              onChangeText={setCategory}
              placeholder="e.g. Formal, Casual, Bridal"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
            />

            <Text style={[styles.label, { color: colors.grayLight, marginTop: 12 }]}>
              Description{opt('optional')}
            </Text>
            <TextInput
              style={[styles.input, styles.inputMultiline, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.offWhite }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description of this template..."
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={2}
              selectionColor={colors.gold}
            />

            <View style={styles.switchRow}>
              <Text style={[styles.label, { color: colors.grayLight, marginTop: 0 }]}>Public Template</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: colors.border, true: colors.goldDim }}
                thumbColor={isPublic ? colors.gold : colors.gray}
              />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={handleClose} style={[styles.cancelBtn, { borderColor: colors.border }]}>
                <Text style={[styles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreate} disabled={!name.trim() || loading} activeOpacity={0.85}>
                <LinearGradient
                  colors={name.trim() ? [colors.goldLight, colors.gold] : [colors.gray, colors.gray]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.createBtn}
                >
                  {loading
                    ? <ActivityIndicator color={colors.background} size="small" />
                    : <Text style={[styles.createText, { color: colors.background }]}>Create</Text>
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

const styles = StyleSheet.create({
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

export default CreateTemplateModal;
