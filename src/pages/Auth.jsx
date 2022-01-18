import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styled from "styled-components/native";
import { logPerson } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
    setError("");
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
      dispatch(logPerson(true));
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
      setIsLoading(false);
    }
  };

  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setIsLogged(true);
        dispatch(logPerson(true));
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
  const LogOut = async () => {
    await AsyncStorage.removeItem("token");
    setIsLogged(false);
    dispatch(logPerson(false));
  };

  useEffect(async () => {
    await checkToken();
  }, []);

  const logInfo = () => {
    if (!isLogged) {
      return (
        <>
          <Error>{error}</Error>
          <Input
            type="text"
            value={username}
            placeholder="ელ.ფოსტა ან მობილური"
            onChangeText={(e) => usernameValidate(e)}
          />
          <Error>{errorUsername}</Error>
          <Password>
            <Input
              autoCompleteType="password"
              secureTextEntry={hidePass ? true : false}
              placeholder="პაროლი"
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </Password>
          <Error>{errorPassword}</Error>
          <Button
            title="ავტორიზაცია"
            color="tomato"
            disabled={!username || !password}
            onPress={() => Login(username, password)}
          />
          {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
        </>
      );
    } else {
      return <Button title="გასვლა" color="tomato" onPress={() => LogOut()} />;
    }
  };

  return (
    <View
      style={{
        margin: 20,
        marginTop: 100,
      }}
    >
      {logInfo()}
    </View>
  );
};

export default Auth;

const Input = styled.TextInput`
  font-size: 18px;
  border-width: 2px;
  border-color: #d5d5d5;
  margin: 2px;
  width: 95%;
`;
const Password = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Error = styled.Text`
  color: red;
  font-size: 16px;
  margin-bottom: 5px;
`;
