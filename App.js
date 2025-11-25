import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './screens/TodoList';
import AddTodo from './screens/AddTodo';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'Lista' }} />
        <Stack.Screen name="AddTodo" component={AddTodo} options={{ title: 'Adicionar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

