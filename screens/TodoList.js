import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function TodoList({ navigation }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });
    loadTodos();
    return unsubscribe;
  }, [navigation]);
  async function loadTodos() {
    try {
      const raw = await AsyncStorage.getItem('@todos');
      if (raw) setTodos(JSON.parse(raw));
      else setTodos([]);
    } catch (e) {}
  }
  async function removeTodo(id) {
    try {
      const filtered = todos.filter(t => t.id !== id);
      await AsyncStorage.setItem('@todos', JSON.stringify(filtered));
      setTodos(filtered);
    } catch (e) {}
  }
  function confirmRemove(id) {
    Alert.alert('Remover', 'Deseja remover esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: () => removeTodo(id) }
    ]);
  }
  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate('AddTodo', { todo: item })} style={styles.button}>
            <Text style={styles.btnText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmRemove(item.id)} style={[styles.button, styles.delete]}>
            <Text style={styles.btnText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList data={todos} keyExtractor={i => i.id.toString()} renderItem={renderItem} ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa</Text>} />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, borderRadius: 6, backgroundColor: '#f2f2f2', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontSize: 16 },
  actions: { flexDirection: 'row' },
  button: { padding: 8, marginLeft: 8, backgroundColor: '#4a90e2', borderRadius: 4 },
  delete: { backgroundColor: '#e14a4a' },
  btnText: { color: '#fff' },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#4a90e2', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#fff', fontSize: 28 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' }
});
