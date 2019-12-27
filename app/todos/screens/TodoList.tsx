import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {ActivityIndicator, Button, Divider} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import Header from '../components/Header';
import TodoView from '../components/TodoView';
import {getTodos} from '../todo-service';
import {ITodoModel} from '../todo-model';

const TodoList: React.FC<any> = props => {
  const [data, setData] = useState<ITodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    } catch (e) {}
    setLoading(false);
  };

  const handleAddToList = (value: ITodoModel) => {
    setData([...data, value]);
  };

  const handleUpdateList = (value: ITodoModel) => {
    // let newData = data.filter(item => item.id !== value.id);
    // setData([value, ...newData]);
    const index = data.findIndex(i => i.id == value.id);
    let newData = data;
    newData[index] = value;
    setData(newData);
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
        // <FlatList
        //   extraData={data}
        //   data={data}
        //   keyExtractor={(item, index) => index.toString()}
        //   style={styles.base}
        //   ItemSeparatorComponent={() => <Divider />}
        //   ListHeaderComponent={() => <Header updateList={handleAddToList} />}
        //   renderItem={({item, index}) => (
        //     <TodoView
        //       removeTodoFromList={handleDeleteFromList}
        //       updateList={handleUpdateList}
        //       item={item}
        //       key={index}
        //     />
        //   )}
        // />
        <View>
          <Header updateList={handleAddToList} />
          {data.map(i => (
            <View>
              <TodoView
                removeTodoFromList={handleDeleteFromList}
                updateList={handleUpdateList}
                item={i}
                key={i.id}
              />
              <Button onPress={() => {}}>Check</Button>
            </View>
          ))}
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
