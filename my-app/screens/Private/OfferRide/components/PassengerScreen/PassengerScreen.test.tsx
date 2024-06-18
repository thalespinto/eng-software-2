import { render, screen } from "@testing-library/react-native";
import PassengerScreen from ".";
import { ICar } from "../../../../../interfaces/ICar";
import { RideContext } from "../../Provider/RideProvider";

const vehicles: ICar[] = [
  {
    id: 1,
    placa: "XXX0000",
    marca: "teste",
    modelo: "Eco Sport",
    cor: "amarela",
    capacidade: "$",
  },
  {
    id: 2,
    placa: "ELN6000",
    marca: "teste",
    modelo: "Tesla",
    cor: "teste",
    capacidade: "4",
  },
];

const mockRideContext = {
  RideInfos: {},
  setRideInfos: jest.fn(),
  setOrigin: jest.fn(),
  setDestination: jest.fn(),
  setPassengers: jest.fn(),
  setCNH: jest.fn(),
  setPassengerCount: jest.fn(),
  vehicles: vehicles,
  addVehicle: jest.fn(),
  deleteVehicle: jest.fn(),
  setAcceptAutomatically: jest.fn(),
  setRadius: jest.fn(),
  setSelectedVehicle: jest.fn(),
  selectedVehicle: {
    id: 2,
    placa: "ELN6000",
    marca: "teste",
    modelo: "Tesla",
    cor: "teste",
    capacidade: "4",
  },
  submitRide: jest.fn().mockResolvedValue(Promise.resolve()),
};

describe("Passenger Screen", () => {
  it("should render correctly", () => {
    render(
      <RideContext.Provider value={mockRideContext}>
        <PassengerScreen />
      </RideContext.Provider>
    );

    expect(
      screen.getByText("Por favor, insira o número de passageiros")
    ).toBeTruthy();
    expect(screen.getByPlaceholderText("Número de Passageiros")).toBeTruthy();
  });
});
