import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingText(name);
  };

  const saveEdit = (id) => {
    setList(list.map((g) => (g.id === id ? {...g, name: editingText } : g)));
    startEditing(null);
    setEditingText("");
  }

  const addItem = () => {
    if (item.trim().length === 0 ) return;
    setList([...list, { id: Date.now().toString(), name: item }]);
    setItem("");
  }
  const removeItem = (id) => {
    setList(list.filter(g => g.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput  style={styles.input} placeholder="Add To-Do List Item" value={item} onChangeText={setItem}></TextInput>
        <Button title="Add" onPress={addItem}/>
      </View>
      <FlatList 
      data={list}
      keyExtractor={(g) => g.id}
      renderItem={({item}) => {
        return (
          <View style={styles.itemRow}>
            {editingId === item.id ? (
              <TextInput
              style={styles.input}
              value={editingText}
              onChangeText={setEditingText}
              onSubmitEditing={() => saveEdit(item.id)}
              autoFocus
              />
            ) : (
              <Text style={styles.itemText}>{item.name}</Text>
            )}
            <View style={styles.buttonRow}>
              <View style={{ flexDirection: "row" }}>
                {editingId === item.id ? (
                  <Pressable onPress={() => saveEdit(item.id)}>
                    <Feather
                    name="save"
                    size={22}
                    color="blue"
                    style={styles.saveButton}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => startEditing(item.id)}>
                    <Feather
                    name="edit"
                    size={22}
                    color="green"
                    style={styles.editButton}
                    />
                  </Pressable>
                )}
              </View>
              <Pressable onPress={() => removeItem(item.id)}>
                    <Feather
                    name="trash"
                    size={22}
                    color="green"
                    style={styles.deleteButton}
                    />
              </Pressable>
            </View>
          </View>
        );
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2e214cff',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
    maxWidth: 600,
    marginRight: "auto",
    marginLeft: "auto",
  },
  input: {
    flex: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9"
  },
  itemRow: {
    width: "100%",
    maxWidth: 1000,
    padding: 12,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "end",
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
  editButton: {
    marginRight: 20,
    fontSize: 18,
    color: "blue",
  },
  saveButton: {
    marginRight: 20,
    fontSize: 18,
    color: "green",
  }
});
