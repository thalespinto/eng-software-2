import { fireEvent, render, screen } from "@testing-library/react-native";
import CarCard from ".";
import { ICar } from "../../../../../interfaces/ICar";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../../../styles/theme";

describe("CarCard", () => {
  const vehicle: ICar = {
    id: 2,
    placa: "ELN6000",
    marca: "teste",
    modelo: "Tesla",
    cor: "teste",
    capacidade: "4",
  };

  it("should render card car correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CarCard vehicle={vehicle} selected={false} onPress={jest.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText(`Modelo: ${vehicle.modelo}`)).toBeTruthy();
    expect(screen.getByText(`Placa: ${vehicle.placa}`)).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const mockOnPress = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <CarCard vehicle={vehicle} selected={true} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const touchable = screen.getByTestId("cardcar-container");
    fireEvent.press(touchable);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
