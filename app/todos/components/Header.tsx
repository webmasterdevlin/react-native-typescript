import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {postTodo} from '../todo-service';
import {ITodoModel} from '../todo-model';

const Header: React.FC<any> = ({text, updateList}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodoModel>({} as ITodoModel);

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
    const {data} = await postTodo(todo);
    updateList(data);
    setVisible(false);
    setTodo({} as ITodoModel);
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
              label="title"
              onChangeText={handleTitleChange}></TextInput>
            <View style={styles.divider} />
            <TextInput
              label="description"
              multiline={true}
              numberOfLines={4}
              onChangeText={handleDescriptionChange}></TextInput>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={async () => {
                setVisible(false);
              }}>
              Cancel
            </Button>
            <Button onPress={() => handleCreateTodoFromDialog()}>Add</Button>
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
