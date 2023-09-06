import * as React from 'react';
import { Pressable } from 'react-native';
import style from '../Style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../components/HomeScreen.jsx';
import SigninScreen from '../components/SigninScreen.jsx';
import ProfilScreen from '../components/ProfilScreen.jsx';
import FormScreen from '../components/FormScreen.jsx';
import LoginScreen from '../components/LoginScreen.jsx';
import PartyScreen from '../components/PartyScreen.jsx';
import PartyCardScreen from '../components/PartyCardScreen.jsx';
import LogoTitle from '../components/utils/LogoTitle.jsx';
import SplashScreen from '../components/utils/SplashScreen.jsx';
import * as SecureStore from 'expo-secure-store';
import { deleteValueFor } from '../js/secureStore';
import { login, signup } from '../js/fetch';

const AuthContext = React.createContext();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  // const [userId, changeUserId] = React.useState(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userId: action.userId,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.userId,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getTokenAsync = async () => {
      let userToken;
      let userId;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userId = await SecureStore.getItemAsync('userId');
        // changeUserId(userId);
        // changeUserToken(userToken);
      } catch (e) {
        console.log('Problème au niveau de SecureStore');
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, userId: userId });
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
          changeUserId(data.userId);
          changeUserToken(data.userToken);
          dispatch({ type: 'SIGN_IN', token: data.token, userId: data.userId });
        });
      },
      signOut: async () => {
        deleteValueFor('userToken');
        deleteValueFor('userId');
        await SecureStore.getItemAsync('userToken');
        await SecureStore.getItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {

        const options = {
          method: "POST",
          headers: { 'Content-Type': 'multipart/form-data' },
          body: data,
        };

        signup(options).then((data) => {
          changeUserId(data.userId);
          changeUserToken(data.userToken);
          dispatch({ type: 'SIGN_IN', token: data.token, userId: data.userId });
          if (data) {
            alert('User enregistré !');
          }
        });
      },
    }),
    []
  );

  function BottomTabs({ navigation }) {
    return (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen navigation={navigation} />}
          options={{
            tabBarIcon: () => (
              <Ionicons name="home" color="black" size={28} />
            ),
            headerTitle: (props) => <LogoTitle {...props} title={"FestiZ"} size={35} />,
            headerStyle: {
              backgroundColor: "#ecf0f1",
            },
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Profil')}>
                <MaterialCommunityIcons name="face-man-profile" size={24} color="black" style={style.iconProfil} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name="Form"
          options={{
            headerTitle: (props) => <LogoTitle {...props} title={"Party"} size={35} />,
            headerStyle: {
              backgroundColor: "#ecf0f1",
            },
            tabBarIcon: () => (
              <AntDesign name="pluscircleo" color="#01C38E" size={34} />
            ),
          }}
        >
          {(props) => <FormScreen {...props} userId={state.userId} userToken={state.userToken} />}
        </Tab.Screen>
        <Tab.Screen
          name="Party"
          options={{
            headerTitle: (props) => <LogoTitle {...props} title={"Mes Party"} size={35} />,
            headerStyle: {
              backgroundColor: "#ecf0f1",
            },
            tabBarIcon: () => (
              <MaterialCommunityIcons name="party-popper" size={28} color="black" />
            ),
          }}
        >
          {(props) => <PartyScreen {...props} userId={state.userId} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  // console.log("Token : " + state.userToken);
  // console.log("userId : " + state.userId);


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                options={{
                  headerTitle: (props) => <LogoTitle {...props} title={"Se connecter"} size={25} />,
                }}
              >
                {(props) => <LoginScreen {...props} authContext={authContext} />}
              </Stack.Screen>
              <Stack.Screen
                name="Signin"
                options={{
                  headerTitle: (props) => <LogoTitle {...props} title={"S'inscrire"} size={25} />,
                  headerBackTitleVisible: false,
                  headerTitleAlign: "center",
                  headerTintColor: "#01C38E",
                }}
              >
                {(props) => <SigninScreen {...props} authContext={authContext} />}
              </Stack.Screen>
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerLargeTitleShadowVisible: false }} />
              <Stack.Screen
                name="Profil"
                options={{
                  headerTitle: (props) => <LogoTitle {...props} title={"Profil"} size={25} />,
                  headerBackTitleVisible: false,
                  headerTitleAlign: "center",
                  animation: "slide_from_bottom",
                  headerTintColor: "#01C38E",
                  headerStyle: {
                    backgroundColor: "#ecf0f1",
                  },
                  headerLargeTitleShadowVisible: false,
                }}
              >
                {(props) => <ProfilScreen {...props} authContext={authContext} userId={state.userId} />}
              </Stack.Screen>
              <Stack.Screen
                name="PartyCard"
                options={{
                  headerTitle: (props) => <LogoTitle {...props} title={"Let's Party !"} size={25} />,
                  headerBackTitleVisible: false,
                  headerTitleAlign: "center",
                  animation: "slide_from_bottom",
                  headerTintColor: "#01C38E",
                  headerStyle: {
                    backgroundColor: "#ecf0f1",
                  },
                  headerLargeTitleShadowVisible: false,
                }}
              >
                {(props) => <PartyCardScreen {...props} userId={state.userId} />}
              </Stack.Screen>
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
