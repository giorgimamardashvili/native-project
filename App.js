import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { View } from "react-native";
import Main from "./Main.jsx";

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
