import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  List,
  Colors,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  Button,
  Switch,
} from 'react-native-paper';
import {ITodoModel} from '../todo-model';
import {deleteTodo, putTodo} from '../todo-service';

interface IProps {
  item: ITodoModel;
  removeTodoFromList: (event: string) => void;
  updateList: (event: ITodoModel) => void;
}

const TodoView: React.FC<IProps> = ({item, removeTodoFromList, updateList}) => {
  const [title, setTitle] = useState<string>(item.title);
  const [description, setDesc] = useState<string>(item.description);
  const [finished, setFinished] = useState<boolean>(item.finished);
  const [visible, setVisible] = useState<boolean>(false);
  const [todoForUpdate, setTodoForUpdate] = useState<ITodoModel>(
    {} as ITodoModel,
  );

  useEffect(() => {
    setTodoForUpdate(item);
  }, []);

  const handleTitleChange = (input: string) => {
    let todo: ITodoModel = {...todoForUpdate};
    todo.title = input;
    setTodoForUpdate(todo);
  };

  const handleDescriptionChange = (input: string) => {
    let todo: ITodoModel = {...todoForUpdate};
    todo.description = input;
    setTodoForUpdate(todo);
  };

  const handleFinishedChange = () => {
    setTodoForUpdate({...todoForUpdate, finished: !todoForUpdate.finished});
  };

  const updateTodoFromDialog = async () => {
    setVisible(false);
    await putTodo(todoForUpdate);
    updateList(todoForUpdate);
  };

  const deleteTodoFromDialog = async () => {
    setVisible(false);
    await deleteTodo(item.id);
    removeTodoFromList(item.id);
  };

  return (
    <>
      <List.Item
        onPress={() => {
          setVisible(true);
        }}
        title={title}
        description={description}
        right={pprops => {
          if (finished) {
            return (
              <List.Icon
                {...pprops}
                color={Colors.green300}
                icon="check-circle"
              />
            );
          }
          return null;
        }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Edit your todo</Dialog.Title>
          <Dialog.Content>
            <View style={{marginBottom: 20}}>
              <View style={styles.divider} />
              <TextInput
                mode={'outlined'}
                value={todoForUpdate.title}
                onChangeText={handleTitleChange}
              />
              <View style={styles.divider} />

              <TextInput
                mode={'outlined'}
                value={todoForUpdate.description}
                multiline={true}
                numberOfLines={4}
                onChangeText={handleDescriptionChange}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Switch
                value={todoForUpdate.finished}
                onValueChange={handleFinishedChange}
              />
              <Paragraph style={{paddingLeft: 16, alignSelf: 'center'}}>
                Finished
              </Paragraph>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => deleteTodoFromDialog()}>delete</Button>
            <View style={{flex: 1}} />
            <Button
              onPress={() => {
                setVisible(false);
              }}>
              Cancel
            </Button>
            <Button onPress={() => updateTodoFromDialog()}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
export default TodoView;

const styles = StyleSheet.create({
  divider: {
    height: 16,
  },
});
