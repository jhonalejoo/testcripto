// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens/Home/Home';
import { DetailScreen } from '../screens/Detail/Detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
