import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabNavigator';
import Register from '../screens/register';
import Login from '../screens/login';
import Routes from '../utils/routes';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen name={Routes.REGISTER} component={Register} />
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.TAB} component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
