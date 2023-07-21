import * as React from 'react';
import { Button, Pressable } from 'react-native';
import style from './Style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen.jsx';
import CityScreen from './components/CityScreen.jsx';
import ProfilScreen from './components/ProfilScreen.jsx';
import FormScreen from './components/FormScreen.jsx';
import LogoTitle from './components/LogoTitle.jsx';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home" color="black" size={28} />
          ),
          headerTitle: (props) => <LogoTitle {...props} title={"FestiZ"} />,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Profil')}>
              <MaterialCommunityIcons name="face-man-profile" size={24} color="black" style={style.iconProfil} />
            </Pressable>

          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={FormScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} title={"Party"} />,
          tabBarIcon: () => (
            <AntDesign name="pluscircleo" color="black" size={34} />
          ),
        }}
      />
      <Tab.Screen
        name="Party"
        component={CityScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} title={"Profil"} />,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="party-popper" size={28} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="City"
          component={CityScreen}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} title={"Profil"} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;
