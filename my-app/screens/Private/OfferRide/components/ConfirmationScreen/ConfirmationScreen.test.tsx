import { fireEvent, render, screen } from "@testing-library/react-native";
import { ICar } from "../../../../../interfaces/ICar";
import { RideContext } from "../../Provider/RideProvider";
import ConfirmationScreen from ".";
import { api } from "../../../../../server/api";
import MockAdapter from "axios-mock-adapter";
import { userContext } from "../../../../../Providers/UserProvider";

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
  RideInfos: {
    date: new Date("2024-06-20T23:04:00.000Z"),
    destination: "São Gonçalo, RJ, Brasil",
    origin: "UFF - Campus Praia Vermelha",
    passengerCount: "3",
  },
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

describe("ConfirmationScreen", () => {
  it("should render correctly", () => {
    render(
      <RideContext.Provider value={mockRideContext}>
        <ConfirmationScreen />
      </RideContext.Provider>
    );

    expect(screen.getByText("Confirmação da Viagem")).toBeTruthy();
    expect(screen.getByText(`Número de Passageiros:`)).toBeTruthy();
    expect(
      screen.getByText(`${mockRideContext.RideInfos.passengerCount}`)
    ).toBeTruthy();

    expect(screen.getByText("Veículo:")).toBeTruthy();
    expect(
      screen.getByText(`Modelo: ${mockRideContext.selectedVehicle.modelo}`)
    ).toBeTruthy();
    expect(
      screen.getByText(`Placa: ${mockRideContext.selectedVehicle.placa}`)
    ).toBeTruthy();
    expect(
      screen.getByText("Aceitar automaticamente passageiros:  ")
    ).toBeTruthy();
    expect(screen.getByTestId("autoAcceptSwitch")).toBeTruthy();
  });

  it("should render correctly when autoAcceptSwitch is pressed", () => {
    render(
      <RideContext.Provider value={mockRideContext}>
        <ConfirmationScreen />
      </RideContext.Provider>
    );

    const autoAcceptSwitch = screen.getByTestId("autoAcceptSwitch");

    fireEvent(autoAcceptSwitch, "valueChange", true);

    expect(screen.getByText("Raio em quilômetros:")).toBeTruthy();
  });
});
