import React from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoList from '../todos/screens/TodoList';
import Login from '../../app/auth/Login';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
            name="login"
            component={Login}
            options={{title: 'Login'}} />
        <Stack.Screen
          name="todoList"
          component={TodoList}
          options={{headerLeft: props => null}}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};
export default RootNavigation;
