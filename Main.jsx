import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./src/pages/Auth";
import Basket from "./src/pages/Basket";
import ProductsPage from "./src/pages/ProductsPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const homeName = "მთავარი";
const basketName = "კალათა";
const authName = "პროფილი";

const Tab = createBottomTabNavigator();

export default function Main() {
  const { logState } = useSelector((state) => state.auth);
  console.log(logState);
  const [isLogged, setIsLogged] = React.useState(false);
  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setIsLogged(true);
      }
    } catch (e) {}
  };
  React.useEffect(async () => {
    await checkToken();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={authName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === authName) {
              iconName = focused ? "log-in" : "log-in-outline";
            } else if (rn === basketName) {
              iconName = focused ? "cart" : "cart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#211844",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { height: 60 },
        })}
      >
        <Tab.Screen name={authName} component={Auth} />
        <Tab.Screen
          name={homeName}
          component={ProductsPage}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              if (logState) {
                navigation.navigate(homeName);
              }
            },
          })}
        />
        <Tab.Screen
          name={basketName}
          component={Basket}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              if (logState) {
                navigation.navigate(basketName);
              }
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
