import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import authClient from "../../services/authClient";
import { API_ENDPOINTS } from "../../config/api.config";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";

const STEPS = ["Email", "Verify", "New Password"];

const ResetPassword = () => {
  const navigation = useNavigation<any>();
  useAppContext();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpValue, setOtpValue] = useState("");
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=newPassword
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const inputs = useRef<(TextInput | null)[]>([]);

  const onSubmitEmail = async () => {
    setLoading(true);
    try {
      await authClient.post(
        `${API_ENDPOINTS.AUTH.SEND_RESET_OTP}?email=${email}`,
      );
      Alert.alert("Succes", "Codul OTP a fost trimis pe email");
      setStep(1);
    } catch (error: any) {
      Alert.alert("Eroare", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, "");
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onVerifyOtp = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      Alert.alert("Error", "Enter a valid OTP 6 digits");
      return;
    }
    setOtpValue(code);
    setStep(2);
  };

  const onResetPassword = async () => {
    setLoading(true);
    try {
      await authClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        email,
        otp: otpValue,
        newPassword,
      });
      Alert.alert("Success", "Password reset successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert("Eroare", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isOtpFilled = otp.every((d) => d !== "");

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>✦</Text>
            </View>
            <Text style={styles.brandTitle}>FASHION SKETCH</Text>
          </View>

          {/* Step indicator */}
          <View style={styles.stepRow}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <View style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      i < step && styles.stepCircleDone,
                      i === step && styles.stepCircleActive,
                    ]}
                  >
                    {i < step ? (
                      <Text style={styles.stepCheckmark}>✓</Text>
                    ) : (
                      <Text
                        style={[
                          styles.stepNum,
                          i === step && styles.stepNumActive,
                        ]}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      i === step && styles.stepLabelActive,
                    ]}
                  >
                    {s}
                  </Text>
                </View>
                {i < STEPS.length - 1 && (
                  <View
                    style={[styles.stepLine, i < step && styles.stepLineDone]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerBR} />

            {/* Step 0 — Email */}
            {step === 0 && (
              <>
                <Text style={styles.cardTitle}>Reset Password</Text>
                <Text style={styles.cardSub}>
                  Enter your registered email address
                </Text>
                <View style={styles.divider} />
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "email" && styles.inputFocused,
                  ]}
                  placeholder="your@email.com"
                  placeholderTextColor="#4A4A5A"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  selectionColor="#D4AF37"
                />
                <TouchableOpacity
                  onPress={onSubmitEmail}
                  disabled={loading || !email.trim()}
                  activeOpacity={0.85}
                  style={styles.btnWrapper}
                >
                  <LinearGradient
                    colors={
                      email.trim()
                        ? ["#E8CC6A", "#D4AF37"]
                        : ["#2A2A38", "#2A2A38"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.btn}
                  >
                    {loading ? (
                      <ActivityIndicator color="#0B0B0F" />
                    ) : (
                      <Text
                        style={[
                          styles.btnText,
                          !email.trim() && styles.btnTextDisabled,
                        ]}
                      >
                        Send Code
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}

            {/* Step 1 — OTP */}
            {step === 1 && (
              <>
                <Text style={styles.cardTitle}>Check Your Email</Text>
                <Text style={styles.cardSub}>
                  Enter the 6-digit code we sent to{"\n"}
                  {email}
                </Text>
                <View style={styles.divider} />
                <View style={styles.otpRow}>
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      style={[styles.otpBox, digit && styles.otpBoxFilled]}
                      value={digit}
                      onChangeText={(val) => handleOtpChange(val, i)}
                      onKeyPress={(e) => handleOtpKeyPress(e, i)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      selectionColor="#D4AF37"
                    />
                  ))}
                </View>
                <TouchableOpacity
                  onPress={onVerifyOtp}
                  disabled={!isOtpFilled}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={
                      isOtpFilled
                        ? ["#E8CC6A", "#D4AF37"]
                        : ["#2A2A38", "#2A2A38"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.btn}
                  >
                    <Text
                      style={[
                        styles.btnText,
                        !isOtpFilled && styles.btnTextDisabled,
                      ]}
                    >
                      Verify Code
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setStep(0)}
                  style={styles.backInCard}
                >
                  <Text style={styles.backInCardText}>← Change email</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Step 2 — New Password */}
            {step === 2 && (
              <>
                <Text style={styles.cardTitle}>Set New Password</Text>
                <Text style={styles.cardSub}>Choose a strong new password</Text>
                <View style={styles.divider} />
                <Text style={styles.fieldLabel}>New Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "newpass" && styles.inputFocused,
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor="#4A4A5A"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  onFocus={() => setFocusedField("newpass")}
                  onBlur={() => setFocusedField(null)}
                  selectionColor="#D4AF37"
                />
                <TouchableOpacity
                  onPress={onResetPassword}
                  disabled={loading || !newPassword.trim()}
                  activeOpacity={0.85}
                  style={styles.btnWrapper}
                >
                  <LinearGradient
                    colors={
                      newPassword.trim()
                        ? ["#E8CC6A", "#D4AF37"]
                        : ["#2A2A38", "#2A2A38"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.btn}
                  >
                    {loading ? (
                      <ActivityIndicator color="#0B0B0F" />
                    ) : (
                      <Text
                        style={[
                          styles.btnText,
                          !newPassword.trim() && styles.btnTextDisabled,
                        ]}
                      >
                        Reset Password
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backRow}
          >
            <Text style={styles.backText}>← Back to Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0B0B0F" },
  kav: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  brand: { alignItems: "center", marginBottom: 28 },
  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(212,175,55,0.1)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  brandMarkText: { fontSize: 20, color: "#D4AF37" },
  brandTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#D4AF37",
  },

  // Step indicator
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  stepItem: { alignItems: "center", gap: 4 },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#2A2A38",
    backgroundColor: "#13131A",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.1)",
  },
  stepCircleDone: { borderColor: "#D4AF37", backgroundColor: "#D4AF37" },
  stepNum: { fontSize: 12, color: "#4A4A5A", fontWeight: "600" },
  stepNumActive: { color: "#D4AF37" },
  stepCheckmark: { fontSize: 12, color: "#0B0B0F", fontWeight: "700" },
  stepLabel: {
    fontSize: 9,
    letterSpacing: 0.8,
    color: "#4A4A5A",
    textTransform: "uppercase",
  },
  stepLabelActive: { color: "#D4AF37" },
  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#2A2A38",
    marginHorizontal: 6,
    marginBottom: 16,
  },
  stepLineDone: { backgroundColor: "#D4AF37" },

  card: {
    backgroundColor: "#13131A",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2A2A38",
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
    borderColor: "#D4AF37",
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
    borderColor: "#D4AF37",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#F0EDE6",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: "#6B6B80",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  divider: { height: 1, backgroundColor: "#2A2A38", marginVertical: 20 },

  fieldLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#6B6B80",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1C1C26",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A2A38",
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: "#F0EDE6",
  },
  inputFocused: { borderColor: "#D4AF37" },

  btnWrapper: { marginTop: 4 },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B0B0F",
    letterSpacing: 0.5,
  },
  btnTextDisabled: { color: "#4A4A5A" },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A2A38",
    backgroundColor: "#1C1C26",
    fontSize: 22,
    fontWeight: "700",
    color: "#F0EDE6",
  },
  otpBoxFilled: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  backInCard: { alignItems: "center", marginTop: 16 },
  backInCardText: { fontSize: 12, color: "#6B6B80", letterSpacing: 0.3 },

  backRow: { alignItems: "center", marginTop: 24 },
  backText: { fontSize: 13, color: "#6B6B80", letterSpacing: 0.3 },
});

export default ResetPassword;
