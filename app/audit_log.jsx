import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AuditLogsScreen() {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    setShowTime(false);
    if (selectedTime) setTime(selectedTime);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AUDIT LOGS</Text>
        </View>

        {/* FILTER CARD */}
        <View style={styles.card}>
          <Text style={styles.filterTitle}>Filter</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Student No."
              style={styles.input}
              placeholderTextColor="#666"
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Status" value="" />
                <Picker.Item label="Active" value="active" />
                <Picker.Item label="Inactive" value="inactive" />
                <Picker.Item label="Absent" value="absent" />
              </Picker>
            </View>
          </View>

          {/* TIME & DATE */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowTime(true)}
            >
              <Text style={styles.dropdownText}>
                {time
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select Time"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDate(true)}
            >
              <Text style={styles.dropdownText}>
                {date ? date.toLocaleDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* PICKERS */}
          {showTime && (
            <DateTimePicker
              value={time || new Date()}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}

          {showDate && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableText}>Student No.</Text>
          <Text style={styles.tableText}>Date</Text>
          <Text style={styles.tableText}>Login Time</Text>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push("/Dashboard")}
          style={styles.navItem}
        >
          <Ionicons name="home-outline" size={20} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <View style={styles.navActive}>
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <Text style={styles.navActiveText}>Logs</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/records")}
          style={styles.navItem}
        >
          <Ionicons name="person-outline" size={20} color="#666" />
          <Text style={styles.navText}>Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A4D5F",
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  filterTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#0c3b44",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 50,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#666",
  },
  navActive: {
    alignItems: "center",
    backgroundColor: "#1A4D5F",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  navActiveText: {
    color: "#fff",
    fontSize: 12,
  },
});