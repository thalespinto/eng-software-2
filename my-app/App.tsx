import { StyleSheet } from "react-native";
import BottomNav from "./components/BottomNav";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
