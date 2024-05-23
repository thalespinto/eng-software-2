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

// Componente de tela de login
const LoginScreen = () => {
  // Hook para navegação entre telas
  const navigation = useNavigation();
  // Contexto de autenticação
  const authInfos = useContext(authContext);

  // Estados para CPF, senha e visibilidade da senha
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Função para lidar com o login
  const handleLogin = async () => {
    try {
      // Tenta fazer o login usando as informações fornecidas
      await authInfos?.SignIn({ cpf, senha: password });
    } catch (error) {
      // Caso ocorra um erro, loga o erro no console e mostra um alerta para o usuário
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
    }
  };

  // Função para alternar a visibilidade da senha
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("C:/Users/david/Documents/GitHub/eng-software-2/my-app/assets/uff-logo.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/*Logo e texto de boas-vindas */}
        <View style={styles.logoContainer}>
          <Text style={styles.loginText}>Bem-vindo à UFF</Text>
        </View>
        {/* Usuário */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={setCPF}
            value={cpf}
            keyboardType="numeric"
          />
          {/* Senha e ícone de visibilidade */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            {/* Botão para alternar a visibilidade da senha */}
            <TouchableOpacity
              onPress={toggleShowPassword}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="blue"
              />
            </TouchableOpacity>
          </View>
          {/* Botão de login */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            accessibilityRole="button"
            accessibilityLabel="Login"
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Estilos para o componente
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