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
import * as Yup from 'yup';
import {Formik} from 'formik';

interface IProps {
  text?: string;
  updateList: (event: ITodoModel) => void;
}

const Header: FC<IProps> = ({updateList, text}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodoModel>({
    title: '',
    description: '',
  } as ITodoModel);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .label('Title')
      .min(2)
      .required(),
    description: Yup.string()
      .label('Description')
      .min(4)
      .required(),
  });

  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const handleCreateTodoFromDialog = async (values: ITodoModel) => {
    setCreateLoading(true);
    try {
      const {data} = await postTodo(values);
      updateList(data);
      setTodo({title: '', description: ''} as ITodoModel);
      setVisible(false);
    } catch (err) {
      Alert.alert(err.message);
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

      <Formik
        initialValues={todo}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await handleCreateTodoFromDialog(values);
          actions.resetForm();
        }}>
        {formikProps => (
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <Dialog.Title>Create a new todo</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Adding a new todo so you can use it later.
                </Paragraph>
                <View style={styles.divider} />
                <TextInput
                  mode={'outlined'}
                  label="title"
                  value={formikProps.values.title}
                  onChangeText={formikProps.handleChange('title')}
                />
                <HelperText type="error">{formikProps.errors.title}</HelperText>
                <View style={styles.divider} />
                <TextInput
                  mode={'outlined'}
                  label="description"
                  multiline={true}
                  numberOfLines={4}
                  value={formikProps.values.description}
                  onChangeText={formikProps.handleChange('description')}
                />
                <HelperText type="error">
                  {formikProps.errors.description}
                </HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}>Exit</Button>
                <Button
                  loading={createLoading}
                  onPress={formikProps.handleSubmit}>
                  Add
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </Formik>
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
