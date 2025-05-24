import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabNavigator';
import Register from '../screens/register';
import Login from '../screens/login';
import Routes from '../utils/routes';
import {useAppSelector} from '../store/hooks';
import ProductDetail from '../screens/products/productDetail';
import FilterScreen from '../screens/filter';
import Products from '../screens/products';
import CreateProductScreen from '../screens/products/CreateProduct';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const {accessToken} = useAppSelector(state => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
      }}>
      {accessToken ? (
        <>
          <Stack.Screen name={Routes.TAB} component={TabNavigator} />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name={Routes.PRODUCTDETAIL}
            component={ProductDetail}
          />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name={Routes.FILTER}
            component={FilterScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name={Routes.PRODUCTS}
            component={Products}
          />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name={Routes.CREATEPRODUCT}
            component={CreateProductScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={Routes.LOGIN} component={Login} />
          <Stack.Screen name={Routes.REGISTER} component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
