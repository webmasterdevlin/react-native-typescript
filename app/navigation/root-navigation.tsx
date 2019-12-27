import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodoList from '../todos/screens/TodoList';
import Login from '../../app/auth/Login';

const MainNavigator = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: () => ({}),
    },
    todoList: {
      screen: TodoList,
      navigationOptions: () => ({
        title: 'Todo List',
        headerLeft: null,
      }),
    },
  },
  {
    initialRouteName: 'login',
  },
);
const RootNavigation = createAppContainer(MainNavigator);
export default RootNavigation;
