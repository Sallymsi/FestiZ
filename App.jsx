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
import SplashScreen from './components/utils/SplashScreen.jsx';
import * as SecureStore from 'expo-secure-store';
import { save, getValueFor, deleteValueFor } from './js/secureStore';
import { login } from './js/fetch';

export const AuthContext = React.createContext();

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

function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // console.log('General : ' + state.userToken);
  // deleteValueFor('userToken');

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getTokenAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log('Not token')
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    getTokenAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        
        const options = {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json" }
        };

        login(options).then((data) => {
          dispatch({ type: 'SIGN_IN', token: data });
          console.log('Token (signIn) : ' + data);
          alert('Connected !');
        });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen 
              name="Login"
              component={LoginScreen}
              options={{
                headerTitle: (props) => <LogoTitle {...props} title={"Login"} size={25} />,
              }}
              />
          ) : (
            <Stack.Group>
              <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Profil"
                component={ProfilScreen}
                options={{
                  headerTitle: (props) => <LogoTitle {...props} title={"Profil"} size={25} />,
                }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
