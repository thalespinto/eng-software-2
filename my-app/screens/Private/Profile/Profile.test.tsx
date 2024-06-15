import { render, screen } from "@testing-library/react-native";
import { authContext } from "../../../Providers/AuthProvider";
import { userContext } from "../../../Providers/UserProvider";
import Profile from ".";
import { View } from "react-native";
import { veiculos } from "../../../mock/cars";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../styles/theme";

const mockUserContext = {
  user: {
    createdAt: new Date("2024-05-06T08:00:00Z"),
    updatedAt: new Date("2024-05-06T08:30:00Z"),
    id: 1,
    login: "usuario123",
    cpf: "123.456.789-00",
    senha: "senha123",
    nome: "João da Silva",
    esta_oferecendo_carona: true,
    reputacao: 4.5,
  },
  setUser: jest.fn(),
};

const mockAuthContext = {
  isSignedIn: true,
  SignIn: jest.fn(),
  SignOut: jest.fn(),
};

describe("ProfileScreen", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <userContext.Provider value={mockUserContext}>
          <authContext.Provider value={mockAuthContext}>
            <Profile />
          </authContext.Provider>
        </userContext.Provider>
      </ThemeProvider>
    );
  });

  const profileScreenTexts = [
    "João da Silva",
    "CPF: 123.456.789-00",
    "Seus Veículos:",
  ];

  it("should render profile screen correctly", () => {
    profileScreenTexts.forEach((text) =>
      expect(screen.getByText(text)).toBeTruthy()
    );
  });
});
