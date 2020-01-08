import React, {FC, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {postTodo} from '../todo-service';
import {ITodoModel} from '../todo-model';

interface IProps {
  text: string;
  updateList: (event: ITodoModel) => void;
}

const Header: FC<IProps> = ({text, updateList}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodoModel>({
    title: '',
    description: '',
  } as ITodoModel);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleTitleChange = (input: string) => {
    const newTodo = {...todo};
    newTodo.title = input;
    setTodo(newTodo);
  };

  const handleDescriptionChange = (input: string) => {
    const newTodo = {...todo};
    newTodo.description = input;
    setTodo(newTodo);
  };

  const handleCreateTodoFromDialog = async () => {
    if (todo.title.length === 0 || todo.description.length === 0) {
      setError('Title and description are required.');
      return;
    }
    setCreateLoading(true);
    try {
      const {data} = await postTodo(todo);
      updateList(data);
      setTodo({title:'', description:''} as ITodoModel);
      setVisible(false);
    } catch (err) {
      setError(err.message);
    }
    setCreateLoading(false);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{text || "Your to do's"}</Text>
      <View style={styles.buttonFrame}>
        <Button
          onPress={() => setVisible(true)}
          style={{marginLeft: 16}}
          mode="outlined">
          Add a todo
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Create a new todo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Adding a new todo so you can use it later.</Paragraph>
            <View style={styles.divider} />
            <TextInput
              mode={'outlined'}
              label="title"
              value={todo.title}
              onChangeText={handleTitleChange}
            />
            <View style={styles.divider} />
            <TextInput
              mode={'outlined'}
              label="description"
              multiline={true}
              numberOfLines={4}
              value={todo.description}
              onChangeText={handleDescriptionChange}
            />
            <HelperText type="error">{error}</HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Exit</Button>
            <Button
              loading={createLoading}
              onPress={() => handleCreateTodoFromDialog()}>
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
    padding: 32,
    paddingLeft: 16,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  divider: {
    height: 16,
  },
  buttonFrame: {
    justifyContent: 'center',
  },
});
