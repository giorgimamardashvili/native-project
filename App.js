import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./src/pages/Auth";
import Basket from "./src/pages/Basket";
import ProductsPage from "./src/pages/ProductsPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const homeName = "მთავარი";
const basketName = "კალათა";
const authName = "პროფილი";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
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

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#211844",
              tabBarInactiveTintColor: "grey",
              tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
              tabBarStyle: { height: 60 },
            })}
          >
            <Tab.Screen name={authName} component={Auth} />
            <Tab.Screen name={homeName} component={ProductsPage} />
            <Tab.Screen name={basketName} component={Basket} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
