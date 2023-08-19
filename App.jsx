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
import { save, getValueFor, deleteValueFor } from './js/secureStore';

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

function HomePack() {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} title={"Profil"} size={25} />,
            }}
          />
    </Stack.Navigator>
  );
}

function App() {
  const [token, onChangeToken] = React.useState(null);
  // save('userToken', 'hiudekzn6764huidb');
  // deleteValueFor('userToken');

  React.useEffect(() => {
    const getTokenAsync = async () => {
      try {
        await SecureStore.getItemAsync('userToken').then((data) => {
          onChangeToken(data);
          console.log(data);
        });
      } catch (e) {
        // onChangeToken(null);
        console.log(e);
      }
    };

    getTokenAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="HomePack" component={HomePack} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
