import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {ActivityIndicator, Divider, HelperText} from 'react-native-paper';
import Header from '../components/Header';
import TodoView from '../components/TodoView';
import {getTodos} from '../todo-service';
import {ITodoModel} from '../todo-model';

const TodoList: React.FC<void> = () => {
  const [data, setData] = useState<ITodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const {data} = await getTodos();
      let sortedData: ITodoModel[] = data.sort(
        (firstItem: ITodoModel, secondItem: ITodoModel) =>
          firstItem.title.toLowerCase() < secondItem.title.toLowerCase()
            ? -1
            : 1,
      );
      setData(sortedData);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleAddToList = (value: ITodoModel) => {
    setData([...data, value]);
  };

  const handleUpdateList = (value: ITodoModel) => {
    const newData = data.filter(item => item.id !== value.id);
    setData([value, ...newData]);
  };

  const handleDeleteFromList = (value: string) => {
    setData(data.filter(item => item.id !== value));
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
          {data.map(i => (
            <View key={i.id}>
              <TodoView
                removeTodoFromList={handleDeleteFromList}
                updateList={handleUpdateList}
                item={i}
              />
            </View>
          ))}
          <HelperText type="error">{error}</HelperText>
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
