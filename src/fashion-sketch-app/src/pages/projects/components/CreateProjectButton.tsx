import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createProject } from "../../../store/slices/projectsSlice";
import { useTheme } from "../../../theme/ThemeContext";

interface Props {
  fontsLoaded: boolean;
}

const CreateProjectButton: React.FC<Props> = ({ fontsLoaded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await dispatch(
      createProject({ name: name.trim(), description: description.trim() }),
    );
    setLoading(false);
    setName("");
    setDescription("");
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceElevated,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.cornerTL, { borderColor: colors.gold }]} />
            <View style={[styles.cornerBR, { borderColor: colors.gold }]} />

            <Text
              style={[
                styles.title,
                { color: colors.offWhite },
                fontsLoaded && { fontFamily: "PlayfairDisplay_700Bold_Italic" },
              ]}
            >
              New Collection
            </Text>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <Text style={[styles.fieldLabel, { color: colors.grayLight }]}>
              Project Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor:
                    focusedField === "name" ? colors.gold : colors.border,
                  color: colors.offWhite,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Summer Couture 2026"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />

            <Text
              style={[
                styles.fieldLabel,
                { color: colors.grayLight, marginTop: 12 },
              ]}
            >
              Description{" "}
              <Text style={[styles.optional, { color: colors.gray }]}>
                (optional)
              </Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.inputMultiline,
                {
                  backgroundColor: colors.surface,
                  borderColor:
                    focusedField === "desc" ? colors.gold : colors.border,
                  color: colors.offWhite,
                },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description..."
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={2}
              selectionColor={colors.gold}
              onFocus={() => setFocusedField("desc")}
              onBlur={() => setFocusedField(null)}
            />

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.cancelBtn, { borderColor: colors.border }]}
              >
                <Text style={[styles.cancelText, { color: colors.grayLight }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCreate}
                disabled={!name.trim() || loading}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={
                    name.trim()
                      ? [colors.goldLight, colors.gold]
                      : [colors.gray, colors.gray]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.createBtn}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.background} size="small" />
                  ) : (
                    <Text
                      style={[styles.createText, { color: colors.background }]}
                    >
                      Create
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 24, marginBottom: 28 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  plus: { fontSize: 22, fontWeight: "300", lineHeight: 24 },
  label: { fontSize: 15, letterSpacing: 1 },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    position: "relative",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 20,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 20,
  },
  title: { fontSize: 22, marginBottom: 12, letterSpacing: 0.3 },
  divider: { height: 1, marginBottom: 20 },
  fieldLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  optional: { fontSize: 10, textTransform: "none", letterSpacing: 0 },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  inputMultiline: { height: 64, textAlignVertical: "top", paddingTop: 12 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  cancelText: { fontSize: 13, letterSpacing: 0.5 },
  createBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  createText: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5 },
});

export default CreateProjectButton;
