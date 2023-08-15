import * as React from 'react';
import { Pressable } from 'react-native';
import style from './Style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen.jsx';
import SigninScreen from './components/SigninScreen.jsx';
import ProfilScreen from './components/ProfilScreen.jsx';
import FormScreen from './components/FormScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import LogoTitle from './components/utils/LogoTitle.jsx';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key).then((data) => {
    console.log(data);
    return result;
    // return result;
  });
}

// async function deleteValueFor(key) {
//   let result = await SecureStore.deleteItemAsync(key);
//   console.log(result);
//   return result;
// }

// deleteValueFor('token');
// const token = getValueFor('token');

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
          headerTitle: (props) => <LogoTitle {...props} title={"FestiZ"} size={35} />,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Login')}>
              <MaterialCommunityIcons name="face-man-profile" size={24} color="black" style={style.iconProfil} />
            </Pressable>

          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={FormScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} title={"Party"} size={35} />,
          tabBarIcon: () => (
            <AntDesign name="pluscircleo" color="black" size={34} />
          ),
        }}
      />
      <Tab.Screen
        name="Party"
        component={SigninScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} title={"Profil"} size={35} />,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="party-popper" size={28} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const userToken = getValueFor('token');
  console.log('Token :' + userToken);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} title={"Profil"} size={25} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;
