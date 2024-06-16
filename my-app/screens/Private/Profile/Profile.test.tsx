import { render, screen, waitFor } from "@testing-library/react-native";
import { authContext } from "../../../Providers/AuthProvider";
import { userContext } from "../../../Providers/UserProvider";
import Profile from ".";
import { View } from "react-native";
import { veiculos } from "../../../mock/cars";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../styles/theme";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../../server/api";

// Mock de dados do contexto do usuário
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

// Mock de dados do contexto de autenticação
const mockAuthContext = {
  isSignedIn: true,
  SignIn: jest.fn(),
  SignOut: jest.fn(),
};

describe("ProfileScreen", () => {
  let mock: MockAdapter;

  // Configura o Mock Adapter antes de cada teste
  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  // Reseta o Mock Adapter após cada teste
  afterEach(() => {
    mock.reset();
  });

  it("should render profile screen correctly", async () => {
    // Espia o método get da API
    const apiGetSpy = jest.spyOn(api, "get");

    // Resposta mockada para obter informações do usuário
    const getUserInfosResponse = {
      id: 1,
      cpf: "12345678910",
      senha: "$2b$10$WZBgPymRIouXDMlpDEEci.xTQhfjhKsDw/9hsCg8jhrDQjYoFI5KW",
      nome: "Test User",
      profile_pic: "",
      nota_media: 5,
    };
    mock
      .onGet(`/user/getId/${mockUserContext.user.id}`)
      .reply(200, getUserInfosResponse);

    // Resposta mockada para obter os veículos do usuário
    const getUserVehicleResponse = [
      {
        id: 12,
        placa: "123bbc",
        marca: "volks",
        modelo: "Ford Car",
        cor: "preto",
        id_usuario: 1,
      },
      {
        id: 13,
        placa: "123asf",
        marca: "chev",
        modelo: "tesla",
        cor: "preto",
        id_usuario: 1,
      },
    ];
    mock
      .onGet(`/vehicle/getUserVehicles/${mockUserContext.user.id}`)
      .reply(200, getUserVehicleResponse);

    // Renderiza o componente Profile envolto nos provedores de contexto e tema
    render(
      <ThemeProvider theme={theme}>
        <userContext.Provider value={mockUserContext}>
          <authContext.Provider value={mockAuthContext}>
            <Profile />
          </authContext.Provider>
        </userContext.Provider>
      </ThemeProvider>
    );

    // Aguarda a execução das chamadas da API e verifica se foram chamadas com as URLs corretas
    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith(
        `/vehicle/getUserVehicles/${mockUserContext.user.id}`
      );

      expect(apiGetSpy).toHaveBeenCalledWith(
        `/user/getId/${mockUserContext.user.id}`
      );
    });

    // Verifica se o nome do usuário e o CPF são renderizados corretamente
    expect(screen.getByText(mockUserContext.user.nome)).toBeTruthy();
    expect(screen.getByText(`CPF: ${mockUserContext.user.cpf}`)).toBeTruthy();

    // Verifica se o botão "Adicionar Veículo" está presente
    expect(screen.getByRole("button", { name: "Adicionar Veículo" }));

    // Verifica se os veículos do usuário são renderizados corretamente
    getUserVehicleResponse.forEach((vehicle) => {
      expect(screen.getByText(`Modelo: ${vehicle.modelo}`)).toBeTruthy();
      expect(screen.getByText(`Placa: ${vehicle.placa}`)).toBeTruthy();
    });

    // Verifica se o botão "Sair" está presente
    expect(screen.getByRole("button", { name: "Sair" })).toBeTruthy();
  });
});
