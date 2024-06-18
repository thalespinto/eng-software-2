import MockAdapter from "axios-mock-adapter";
import { api } from "../../../../../server/api";
import { render, screen, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "@rneui/themed";
import AddVehicle from ".";
import { userContext } from "../../../../../Providers/UserProvider";
import { theme } from "../../../../../styles/theme";
import { RideContext } from "../../Provider/RideProvider";
import { ICar } from "../../../../../interfaces/ICar";

const mockUserContext = {
  user: {
    createdAt: new Date("2024-05-06T08:00:00Z"),
    updatedAt: new Date("2024-05-06T08:30:00Z"),
    id: 3,
    login: "usuario123",
    cpf: "123.456.789-00",
    senha: "senha123",
    nome: "João da Silva",
    esta_oferecendo_carona: true,
    reputacao: 4.5,
  },
  setUser: jest.fn(),
};

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

describe("AddVehicle", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should render cars correctly", async () => {
    const apiGetSpy = jest.spyOn(api, "get");
    mock.onGet("/vehicle/getUserVehicles/3").reply(200, [
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
    ]);

    render(
      <ThemeProvider theme={theme}>
        <userContext.Provider value={mockUserContext}>
          <RideContext.Provider value={mockRideContext}>
            <AddVehicle />
          </RideContext.Provider>
        </userContext.Provider>
      </ThemeProvider>
    );

    await waitFor(() =>
      expect(apiGetSpy).toHaveBeenCalledWith("/vehicle/getUserVehicles/3")
    );

    expect(screen.getByText("Adicionar Veículo")).toBeTruthy();

    vehicles.forEach((car) => {
      expect(screen.getByText(`Modelo: ${car.modelo}`)).toBeTruthy();
      expect(screen.getByText(`Placa: ${car.placa}`)).toBeTruthy();
    });
  });
});
