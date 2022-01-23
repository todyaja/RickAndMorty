import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import CharacterDetailScreen from './src/screens/CharacterDetails'
import FavoriteScreen from './src/screens/Favorite'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
              name="Home Screen"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
            />
          <Stack.Screen name="Character Details" component={CharacterDetailScreen}/>
          <Stack.Screen name="Favorite Screen" component={FavoriteScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
  );
};
export default MyStack

