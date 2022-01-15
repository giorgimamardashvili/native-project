import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(value));
      setIsLoading(false);
      setUsername("");
      setPassword("");
    } catch (e) {}
  };

  const formValidate = () => {
    username == ""
      ? setErrorUsername("ველის შევსება აუცილებელია")
      : setErrorUsername("");
    password == ""
      ? setErrorPassword("ველის შევსება აუცილებელია")
      : setErrorPassword("");
  };

  const Login = async (username, password) => {
    formValidate();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://cms.vendoo.ge/api/customer/login`,
        { username: username, password: password },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      await AsyncStorage.removeItem("token");
      const token = response.data.token;
      await storeToken(token);
      setIsLogged(() => true);
      isLogged ? navigation.navigate("მთავარი") : "";
    } catch (e) {
      setError("");
      console.log(e);
      e.response.status == 422
        ? setError("შეყვანილი ინფორმაცია არასწორია")
        : setError("");
      e.response.status == 500
        ? setError(e.response.data.message)
        : setError("");
    }
  };

  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setIsLogged(true);
      }
    } catch (e) {}
  };

  const usernameValidate = (username) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(username) === false) {
      setUsername(username);
      return false;
    } else {
      setUsername(username);
    }
  };

  useEffect(async () => {
    await checkToken();
  }, []);

  return (
    <View
      style={{
        margin: 20,
        marginTop: 100,
      }}
    >
      <Text style={styles.error}>{error}</Text>
      <TextInput
        style={styles.input}
        type="text"
        value={username}
        placeholder="ელ.ფოსტა ან მობილური"
        onChangeText={(e) => usernameValidate(e)}
      />
      <Text style={styles.error}>{errorUsername}</Text>
      <View style={styles.password}>
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          secureTextEntry={hidePass ? true : false}
          placeholder="პაროლი"
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <Text style={styles.error}>{errorPassword}</Text>
      <Button
        title="ავტორიზაცია"
        color="green"
        disabled={!username || !password}
        onPress={() => Login(username, password)}
      />
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#d5d5d5",
    margin: 2,
    width: "95%",
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 5,
  },
});
