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
import { Colors } from "../../../theme/colors";

interface Props {
  fontsLoaded: boolean;
}

const CreateProjectButton: React.FC<Props> = ({ fontsLoaded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
        style={styles.wrapper}
      >
        <LinearGradient
          colors={[Colors.goldLight, Colors.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.plus}>+</Text>
          <Text
            style={[
              styles.label,
              fontsLoaded && { fontFamily: "PlayfairDisplay_700Bold" },
            ]}
          >
            New Project
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalGoldCornerTL} />
            <View style={styles.modalGoldCornerBR} />

            <Text
              style={[
                styles.modalTitle,
                fontsLoaded && { fontFamily: "PlayfairDisplay_700Bold_Italic" },
              ]}
            >
              New Collection
            </Text>
            <View style={styles.modalDivider} />

            <Text style={styles.inputLabel}>Project Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Summer Couture 2026"
              placeholderTextColor={Colors.gray}
              selectionColor={Colors.gold}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>
              Description{" "}
              <Text style={styles.inputLabelOptional}>(optional)</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description..."
              placeholderTextColor={Colors.gray}
              multiline
              numberOfLines={2}
              selectionColor={Colors.gold}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCreate}
                disabled={!name.trim() || loading}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={
                    name.trim()
                      ? [Colors.goldLight, Colors.gold]
                      : [Colors.gray, Colors.gray]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.createButton}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.background} size="small" />
                  ) : (
                    <Text style={styles.createText}>Create</Text>
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
  wrapper: {
    marginHorizontal: 24,
    marginBottom: 28,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  plus: {
    color: Colors.background,
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 24,
  },
  label: {
    color: Colors.background,
    fontSize: 15,
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11,11,15,0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    position: "relative",
  },
  modalGoldCornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: Colors.gold,
    borderTopLeftRadius: 20,
  },
  modalGoldCornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: Colors.gold,
    borderBottomRightRadius: 20,
  },
  modalTitle: {
    color: Colors.offWhite,
    fontSize: 22,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  modalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 20,
  },
  inputLabel: {
    color: Colors.grayLight,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  inputLabelOptional: {
    color: Colors.gray,
    fontSize: 10,
    textTransform: "none",
    letterSpacing: 0,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.offWhite,
    fontSize: 14,
  },
  inputMultiline: {
    height: 64,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    color: Colors.grayLight,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  createButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  createText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default CreateProjectButton;
