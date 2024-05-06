import "react-native-gesture-handler";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./styles/theme";
import Routes from "./Routes";
import AuthProvider from "./Providers/AuthProvider";
import UserProvider from "./Providers/UserProvider";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
