import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../../../styles/theme";
import DeleteCarDialog from ".";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { api } from "../../../../../server/api";
import MockAdapter from "axios-mock-adapter";
import { Alert } from "react-native";

describe("DeleteCarDialog", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);

    render(
      <ThemeProvider theme={theme}>
        <DeleteCarDialog
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

  // Testa se o formulário de exclusão é exibido corretamente
  it("should show form correctly", () => {
    expect(screen.getByText("Deseja mesmo excluir este veículo?")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Voltar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Excluir" })).toBeTruthy();
  });

  // Testa se a exclusão do veículo é tratada corretamente ao pressionar o botão
  it("should handle delete car correctly on button press", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));
    const apiDeleteSpy = jest.spyOn(api, "delete");

    mock.onDelete(`/vehicle/delete/1`).reply(200, {
      message: "Veículo excluído com sucesso",
    });

    const deleteButton = screen.getByRole("button", { name: "Excluir" });
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(apiDeleteSpy).toHaveBeenCalledWith("/vehicle/delete/1");
      expect(Alert.alert).toHaveBeenCalledWith("Veículo excluído com sucesso!");
    });
  });

  // Testa se uma mensagem de erro é exibida em caso de falha na exclusão
  it("should show an error message on failure", async () => {
    jest.mock("react-native/Libraries/Alert/Alert", () => ({
      alert: jest.fn(),
    }));

    const apiDeleteSpy = jest.spyOn(api, "delete");

    mock.onDelete(`/vehicle/delete/1`).reply(404, {
      message: "Veículo não encontrado",
    });

    const deleteButton = screen.getByRole("button", { name: "Excluir" });
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(apiDeleteSpy).toHaveBeenCalledWith("/vehicle/delete/1");
      expect(Alert.alert).toHaveBeenCalledWith("Erro ao excluir veículo");
    });
  });
});
