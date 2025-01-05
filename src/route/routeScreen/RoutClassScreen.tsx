import React, {useCallback} from 'react';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../../components/Search_Screen/SearchScreen';
import ClassScreen from '../../screens/class/ClassScreen';
import YearScreen from '../../screens/Year/YearScreen';

const Stack = createStackNavigator();

const RouteClassScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Reset the navigation stack to ensure the initial screen is shown
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'ClassScreen'}],
        }),
      );
    }, [navigation]),
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClassScreen"
        component={ClassScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RouteClassScreen;
