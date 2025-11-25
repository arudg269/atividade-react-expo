import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AddTodo({ navigation, route }) {
  const [text, setText] = useState('');
  const editing = route.params && route.params.todo;
  useEffect(() => {
    if (editing) setText(editing.text);
  }, [editing]);
  async function save() {
    try {
      const raw = await AsyncStorage.getItem('@todos');
      const list = raw ? JSON.parse(raw) : [];
      if (editing) {
        const updated = list.map(t => (t.id === editing.id ? { ...t, text } : t));
        await AsyncStorage.setItem('@todos', JSON.stringify(updated));
      } else {
        const id = Date.now();
        const next = [{ id, text }, ...list];
        await AsyncStorage.setItem('@todos', JSON.stringify(next));
      }
      navigation.goBack();
    } catch (e) {}
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Digite a tarefa" value={text} onChangeText={setText} />
      <TouchableOpacity style={styles.save} onPress={save}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12, fontSize: 16, marginBottom: 12 },
  save: { backgroundColor: '#4a90e2', padding: 12, borderRadius: 6, alignItems: 'center' },
  saveText: { color: '#fff', fontSize: 16 }
});
