import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  List,
  Colors,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  Button,
  Switch,
  HelperText,
} from 'react-native-paper';
import {ITodoModel} from '../todo-model';
import {deleteTodo, putTodo} from '../todo-service';

interface IProps {
  item: ITodoModel;
  removeTodoFromList: (event: string) => void;
  updateList: (event: ITodoModel) => void;
}

/*
* Not using Formik
* Go to Header.tsx to see
* the implementation of Formik
* */
const TodoView: React.FC<IProps> = ({item, removeTodoFromList, updateList}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [todoForUpdate, setTodoForUpdate] = useState<ITodoModel>(
    {} as ITodoModel,
  );
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTodoForUpdate(item);
  }, []);

  const deleteTodoFromDialog = async () => {
    setDeleteLoading(true);
    try {
      await deleteTodo(item.id);
      removeTodoFromList(item.id);
      setVisible(false);
    } catch (e) {
      setError(e.message);
    }
    setDeleteLoading(false);
  };

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
    if (
      todoForUpdate.title.length === 0 ||
      todoForUpdate.description.length === 0
    ) {
      setError('Title and description are required.');
      return;
    }

    setUpdateLoading(true);
    try {
      await putTodo(todoForUpdate);
      updateList(todoForUpdate);
      setVisible(false);
    } catch (e) {
      setError(error);
    }
    setUpdateLoading(false);
  };

  return (
    <>
      <List.Item
        onPress={() => {
          setVisible(true);
        }}
        title={item.title}
        description={item.description}
        right={otherProps => {
          if (item.finished) {
            return (
              <List.Icon
                {...otherProps}
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
                value={todoForUpdate.title}
                onChangeText={handleTitleChange}
              />
              <View style={styles.divider} />
              <TextInput
                value={todoForUpdate.description}
                multiline
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
            <HelperText type="error">{error}</HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              loading={deleteLoading}
              onPress={() => deleteTodoFromDialog()}>
              delete
            </Button>
            <View style={{flex: 1}} />
            <Button
              onPress={() => {
                setVisible(false);
              }}>
              Cancel
            </Button>
            <Button
              loading={updateLoading}
              onPress={() => updateTodoFromDialog()}>
              Update
            </Button>
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
