import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Routes from '../utils/routes';
import Profile from '../screens/profile';
import {TouchableOpacity} from 'react-native';
import {logoutThunk} from '../store/actions/authActions';
import {useAppDispatch} from '../store/hooks';
import {FilterAdd, Logout} from 'iconsax-react-nativejs';
import {useNavigation} from '@react-navigation/native';
import Favorites from '../screens/favorites';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{paddingRight: 10}}
              onPress={() => navigation.navigate(Routes.FILTER)}>
              <FilterAdd size="32" color="#000" />
            </TouchableOpacity>
          ),
        }}
        name={Routes.HOME}
        component={Home}
      />
      <Tab.Screen name={Routes.FAVORITES} component={Favorites} />
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
