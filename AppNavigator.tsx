import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersListScreen from './screens/UsersListScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UsersList" >
        <Stack.Screen name="cp3-Anna Soares ;)" component={UsersListScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
