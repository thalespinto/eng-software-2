import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../../../styles/theme";
import EditCarDialog from ".";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { api } from "../../../../../server/api";
import MockAdapter from "axios-mock-adapter";
import { Alert } from "react-native";

describe("EditCardDialog", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);

    render(
      <ThemeProvider theme={theme}>
        <EditCarDialog
          car={{
            id: 1,
            placa: "123bb",
            marca: "chevrolet",
            modelo: "gol bolinha",
            cor: "preto",
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          isVisible={true}
          onBackdropPress={() => jest.fn()}
          onSuccess={jest.fn()}
        />
      </ThemeProvider>
    );
  });

  afterEach(() => {
    mock.reset();
  });

  // Verifica se o formulário é exibido corretamente
  it("should show form correctly", () => {
    expect(screen.getByText("Edite o veículo")).toBeTruthy();
    expect(screen.getByText("Modelo")).toBeTruthy();
    expect(screen.getByText("Placa")).toBeTruthy();

    const textInputs = screen.getAllByTestId("RNE__Input__text-input");
    expect(textInputs[0].props.value).toBe("gol bolinha");
    expect(textInputs[1].props.value).toBe("123bb");

    expect(screen.getByRole("button", { name: "Confirmar" })).toBeTruthy();
  });

  // Verifica se o formulário funciona corretamente
  it("should form work correctly", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));
    const apiPutSpy = jest.spyOn(api, "put");

    const textInputs = screen.getAllByTestId("RNE__Input__text-input");
    fireEvent.changeText(textInputs[0], "modeloteste");
    fireEvent.changeText(textInputs[1], "placateste");
    expect(textInputs[0].props.value).toBe("modeloteste");
    expect(textInputs[1].props.value).toBe("placateste");

    mock
      .onPut(`/vehicle/update/1`, {
        modelo: "modeloteste",
        placa: "placateste",
      })
      .reply(200, {
        message: "Veículo atualizado com sucesso",
      });

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(apiPutSpy).toHaveBeenCalledWith("/vehicle/update/1", {
        modelo: "modeloteste",
        placa: "placateste",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Veículo editado com sucesso!");
    });
  });

  // Verifica se uma mensagem de erro é exibida em caso de falha
  it("should show an error message on failure", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));

    const apiPutSpy = jest.spyOn(api, "put");

    mock
      .onPut(`/vehicle/update/1`, {
        modelo: "gol bolinha",
        placa: "123bb",
      })
      .reply(500, {
        message: "Erro ao atualizar veículo",
      });

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(apiPutSpy).toHaveBeenCalledWith("/vehicle/update/1", {
        modelo: "gol bolinha",
        placa: "123bb",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Erro ao editar veículo");
    });
  });
});
