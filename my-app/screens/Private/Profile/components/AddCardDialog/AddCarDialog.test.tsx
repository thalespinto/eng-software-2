import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../../../styles/theme";
import AddCarDialog from ".";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { api } from "../../../../../server/api";
import MockAdapter from "axios-mock-adapter";
import { Alert } from "react-native";
import { userContext } from "../../../../../Providers/UserProvider";

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

describe("AddCardDialog", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);

    render(
      <ThemeProvider theme={theme}>
        <userContext.Provider value={mockUserContext}>
          <AddCarDialog
            isVisible={true}
            onBackdropPress={() => jest.fn()}
            onSuccess={jest.fn()}
          />
        </userContext.Provider>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    mock.reset();
  });

  it("should show form correctly", () => {
    expect(screen.getByText("Insira os dados do veículo")).toBeTruthy();
    expect(screen.getByText("Modelo")).toBeTruthy();
    expect(screen.getByText("Placa")).toBeTruthy();

    const textInputs = screen.getAllByTestId("RNE__Input__text-input");
    expect(textInputs[0].props.value).toBe("");
    expect(textInputs[1].props.value).toBe("");

    expect(screen.getByRole("button", { name: "Confirmar" })).toBeTruthy();
  });

  it("should form work correctly", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));
    const apiPostSpy = jest.spyOn(api, "post");

    const textInputs = screen.getAllByTestId("RNE__Input__text-input");
    fireEvent.changeText(textInputs[0], "modeloteste");
    fireEvent.changeText(textInputs[1], "placateste");
    expect(textInputs[0].props.value).toBe("modeloteste");
    expect(textInputs[1].props.value).toBe("placateste");

    mock
      .onPost(`/vehicle/create`, {
        modelo: "modeloteste",
        placa: "placateste",
        id_usuario: 1,
      })
      .reply(200, {
        message: "Veículo cadastrado com sucesso",
      });

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(apiPostSpy).toHaveBeenCalledWith("/vehicle/create", {
        modelo: "modeloteste",
        placa: "placateste",
        id_usuario: 1,
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Veículo cadastrado com sucesso!"
      );
    });
  });

  it("should show an error message on failure", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));

    const apiPostSpy = jest.spyOn(api, "post");

    const textInputs = screen.getAllByTestId("RNE__Input__text-input");
    fireEvent.changeText(textInputs[0], "modeloteste");
    fireEvent.changeText(textInputs[1], "placateste");
    expect(textInputs[0].props.value).toBe("modeloteste");
    expect(textInputs[1].props.value).toBe("placateste");

    mock
      .onPost(`/vehicle/create`, {
        modelo: "modeloteste",
        placa: "placateste",
        id_usuario: 1,
      })
      .reply(500, {
        message: "Erro ao atualizar veículo",
      });

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(apiPostSpy).toHaveBeenCalledWith("/vehicle/create", {
        modelo: "modeloteste",
        placa: "placateste",
        id_usuario: 1,
      });
      expect(Alert.alert).toHaveBeenCalledWith("Erro ao cadastrar veículo");
    });
  });
});
