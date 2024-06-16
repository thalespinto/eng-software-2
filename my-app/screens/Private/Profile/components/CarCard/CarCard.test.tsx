import { ThemeProvider } from "@rneui/themed";
import { render, screen } from "@testing-library/react-native";
import CarCard from ".";
import { getAccessibilityRole } from "@testing-library/react-native/build/helpers/accessibility";
import { theme } from "../../../../../styles/theme";

describe("CarCard", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CarCard
          car={{
            id: 1,
            placa: "123bb",
            marca: "chevrolet",
            modelo: "gol bolinha",
            cor: "preto",
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          fetchUserVehicles={jest.fn()}
        />
      </ThemeProvider>
    );
  });

  // Testa se as informações do carro são exibidas corretamente no componente
  it("should show car infos correctly", () => {
    expect(screen.getByText("Modelo: gol bolinha")).toBeTruthy();
    expect(screen.getByText("Placa: 123bb")).toBeTruthy();
  });

  // Testa se os botões de ação (Editar e Excluir) são exibidos corretamente
  it("should show action buttons correctly", () => {
    const editButton = screen.getByRole("button", { name: "Editar" });
    const deleteButton = screen.getByRole("button", {name: "Excluir"});

    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });
});
