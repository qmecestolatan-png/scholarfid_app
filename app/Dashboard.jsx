import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

const Dashboard = () => {

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Error', 'Logout failed. Please try again.')
    } else {
      router.replace('/Login') // navigate back to login
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>DASHBOARD</Text>

        <View style={styles.welcomeRow}>
          <Ionicons name="shield-checkmark" size={60} color="#00C2FF" />
          <View>
            <Text style={styles.welcomeText}>WELCOME BACK,</Text>
            <Text style={styles.adminText}>ADMIN!</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Logs</Text>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewText} onPress={() => router.push("/audit_log")}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bigCard} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Records</Text>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewText} onPress={() => router.push("/records")}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bigCard} />
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <View style={styles.navItemActive}>
          <Ionicons name="home-outline" size={20} color="#fff" />
          <Text style={styles.navTextActive}>Home</Text>
        </View>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/audit_log")}>
          <Ionicons name="document-text-outline" size={20} />
          <Text style={styles.navText}>Logs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/records")}>
          <Ionicons name="person-outline" size={20} />
          <Text style={styles.navText}>Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A4D5F", paddingTop: 50, paddingHorizontal: 15 },
  headerTitle: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  welcomeRow: { flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 25 },
  welcomeText: { color: "#fff", fontSize: 14, letterSpacing: 1 },
  adminText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  viewBtn: { borderWidth: 1, borderColor: "#fff", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15 },
  viewText: { color: "#fff", fontSize: 12 },
  bigCard: { backgroundColor: "#D9D9D9", height: 120, borderRadius: 20, marginTop: 10, marginBottom: 20 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#D9D9D9", borderRadius: 20, paddingVertical: 10, marginBottom: 55 },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12 },
  navItemActive: { alignItems: "center", backgroundColor: "#1A4D5F", padding: 10, borderRadius: 20 },
  navTextActive: { color: "#fff", fontSize: 12 },
  logoutBtn: { backgroundColor: "#ff4d4d", padding: 12, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  logoutText: { color: "#fff", fontWeight: "bold" }
})