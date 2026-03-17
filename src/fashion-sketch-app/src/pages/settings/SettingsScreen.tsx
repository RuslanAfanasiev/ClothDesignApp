import React from "react";
import { View, Text, StyleSheet, Switch, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeContext";
import AppHeader from "../../components/AppHeader";

const SettingsScreen: React.FC = () => {
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <AppHeader />

      <SafeAreaView edges={["bottom"]} style={styles.body}>
        <Text style={[styles.sectionTitle, { color: colors.grayLight }]}>
          Appearance
        </Text>

        <View
          style={[
            styles.row,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>{isDark ? "🌙" : "☀️"}</Text>
            <View>
              <Text style={[styles.rowLabel, { color: colors.offWhite }]}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
              <Text style={[styles.rowSub, { color: colors.grayLight }]}>
                {isDark ? "Switch to light theme" : "Switch to dark theme"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.goldDim }}
            thumbColor={isDark ? colors.gold : colors.gray}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowIcon: { fontSize: 22 },
  rowLabel: { fontSize: 15, fontWeight: "600", letterSpacing: 0.2 },
  rowSub: { fontSize: 12, marginTop: 2, letterSpacing: 0.2 },
});

export default SettingsScreen;
