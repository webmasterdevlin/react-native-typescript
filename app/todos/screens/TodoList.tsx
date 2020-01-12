import React, {FC, useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  HelperText,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import Header from '../components/Header';
import TodoView from '../components/TodoView';
import {getTodos} from '../todo-service';
import {ITodoModel} from '../todo-model';

const TodoList: FC = () => {
  const [todos, setTodos] = useState<ITodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const {data} = await getTodos();
      const sortedData: ITodoModel[] = data.sort(
        (firstItem: ITodoModel, secondItem: ITodoModel) =>
          firstItem.title.toLowerCase() < secondItem.title.toLowerCase()
            ? -1
            : 1,
      );
      setTodos(sortedData);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleAddToList = (value: ITodoModel) => {
    setTodos([...todos, value]);
  };

  const handleUpdateList = (value: ITodoModel) => {
    const index = todos.findIndex(t => t.id === value.id);
    let newTodos = todos;
    newTodos[index] = value;
    setTodos([...newTodos]);
  };

  const handleDeleteFromList = (value: string) => {
    setTodos([...todos.filter(item => item.id !== value)]);
  };

  return (
    <>
      {loading ? (
        <View style={styles.loaderBase}>
          <ActivityIndicator animating size="large" />
        </View>
      ) : (
        <View style={styles.base}>
          <Header updateList={handleAddToList} />
          <Divider />
          {todos.map(t => (
            <View key={t.id}>
              <TodoView
                removeTodoFromList={handleDeleteFromList}
                updateList={handleUpdateList}
                item={t}
              />
            </View>
          ))}
          <>
            <Portal>
              <Snackbar
                visible={error.length > 0}
                duration={5000}
                action={{
                  label: 'close [x]',
                  onPress: () => {
                    setError('');
                  },
                }}
                onDismiss={async () => {
                  setError('');
                  await fetch();
                }}>
                {error}
              </Snackbar>
            </Portal>
          </>
        </View>
      )}
    </>
  );
};
export default TodoList;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderBase: {
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
