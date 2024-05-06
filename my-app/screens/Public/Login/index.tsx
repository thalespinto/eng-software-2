import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../../../Providers/AuthProvider";

const LoginScreen = () => {
  const navigation = useNavigation();
  const authInfos = useContext(authContext);

  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("CPF:", cpf);
    console.log("Senha:", password);
    authInfos?.SignIn({ cpf: cpf, password: password });
    // Após o login bem-sucedido, navegue para a página CNH
    //navigation.navigate('CNH');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("C:/Users/thales/Documents/Projetos/eng-software-2/my-app/assets/uff-logo.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.loginText}>Bem-vindo à UFF</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={setCPF}
            value={cpf}
            keyboardType="numeric"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="blue"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#002b5e",
  },
  formContainer: {
    flex: 2,
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
