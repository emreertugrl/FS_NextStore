import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Routes from '../utils/routes';
import Profile from '../screens/profile';
import {Text, TouchableOpacity} from 'react-native';
import {logoutThunk} from '../store/actions/authActions';
import {useAppDispatch} from '../store/hooks';
import {Logout} from 'iconsax-react-nativejs';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const dispatch = useAppDispatch();
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.HOME} component={Home} />
      <Tab.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{paddingRight: 10}}
              onPress={() => dispatch(logoutThunk())}>
              <Logout size="32" color="#000" />
            </TouchableOpacity>
          ),
        }}
        name={Routes.PROFILE}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
