import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Records() {
  const [records, setRecords] = useState([
    { id: "1", name: "Gil Fernando", number: "2314577", status: "Active" },
    { id: "2", name: "Lalo Salamanca", number: "2314567", status: "Inactive" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState("All");

  // 🔥 ADD MODAL
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    number: "",
    status: "Active",
  });

  // 🔥 DELETE MODAL
  const [deleteId, setDeleteId] = useState(null);

  // FILTER
  const filteredRecords =
    filter === "All"
      ? records
      : records.filter((r) => r.status === filter);

  // ================= ADD =================
  const handleAdd = () => {
    if (!newData.name || !newData.number) return;

    const newRecord = {
      id: Date.now().toString(),
      ...newData,
    };

    setRecords([...records, newRecord]);
    setAddModalVisible(false);
    setNewData({ name: "", number: "", status: "Active" });
  };

  // ================= EDIT =================
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const saveEdit = () => {
    setRecords(
      records.map((item) =>
        item.id === editingId ? { ...editData } : item
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  // ================= DELETE =================
  const confirmDelete = () => {
    setRecords(records.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  const renderItem = ({ item }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.card}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={editData.name}
              onChangeText={(text) =>
                setEditData({ ...editData, name: text })
              }
            />
            <TextInput
              style={styles.input}
              value={editData.number}
              onChangeText={(text) =>
                setEditData({ ...editData, number: text })
              }
            />
            <TextInput
              style={styles.input}
              value={editData.status}
              onChangeText={(text) =>
                setEditData({ ...editData, status: text })
              }
            />

            <View style={styles.actions}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.label}>
              Student Name: <Text style={styles.value}>{item.name}</Text>
            </Text>
            <Text style={styles.label}>
              Student No.: <Text style={styles.value}>{item.number}</Text>
            </Text>
            <Text style={styles.label}>
              Status: <Text style={styles.value}>{item.status}</Text>
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => startEdit(item)}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setDeleteId(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={24} color="#fff" />
        <Text style={styles.headerTitle}>RECORDS</Text>

        {/* ➕ ADD BUTTON */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* FILTER */}
      <View style={styles.filterCard}>
        <View style={styles.filterHeader}>
          <Ionicons name="filter" size={14} />
          <Text style={{ marginLeft: 5 }}>Filter</Text>
        </View>

        <View style={styles.dropdownRow}>
          {["All", "Active", "Inactive"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterOption,
                filter === item && styles.filterSelected,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={{
                  color: filter === item ? "#fff" : "#000",
                  fontSize: 12,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* LIST */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </View>

      {/* 🔥 ADD MODAL */}
      <Modal transparent visible={addModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Student</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newData.name}
              onChangeText={(text) =>
                setNewData({ ...newData, name: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Student No."
              value={newData.number}
              onChangeText={(text) =>
                setNewData({ ...newData, number: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Status (Active/Inactive)"
              value={newData.status}
              onChangeText={(text) =>
                setNewData({ ...newData, status: text })
              }
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* DELETE MODAL */}
      <Modal transparent visible={deleteId !== null} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this record?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteId(null)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={confirmDelete}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/Dashboard")}>
          <Ionicons name="home-outline" size={20} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/audit_log")}>
          <Ionicons name="document-text-outline" size={20} />
          <Text style={styles.navText}>Logs</Text>
        </TouchableOpacity>

        <View style={styles.navActive}>
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.navActiveText}>Records</Text>
        </View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A4D5F",
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    padding: 6,
  },

  filterCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dropdownRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterOption: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  filterSelected: {
    backgroundColor: "#1A4D5F",
  },

  listContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
    flex: 1,
  },

  card: {
    paddingVertical: 10,
  },

  label: {
    fontWeight: "bold",
    fontSize: 13,
  },
  value: {
    fontWeight: "normal",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    marginBottom: 6,
    fontSize: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },

  editBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  saveBtn: {
    backgroundColor: "green",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: "gray",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#999",
    marginVertical: 10,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },

  navText: {
    fontSize: 12,
    textAlign: "center",
  },

  navActive: {
    alignItems: "center",
    backgroundColor: "#1A4D5F",
    padding: 10,
    borderRadius: 20,
  },
  navActiveText: {
    color: "#fff",
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});