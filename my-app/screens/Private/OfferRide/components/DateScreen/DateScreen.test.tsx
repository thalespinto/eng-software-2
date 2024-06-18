import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DateScreen from ".";
import { RideContext } from "../../Provider/RideProvider";
import { ICar } from "../../../../../interfaces/ICar";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../../../../styles/theme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

jest.mock("@react-native-community/datetimepicker", () => {
  return {
    DateTimePickerAndroid: {
      open: jest.fn(),
    },
  };
});

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

describe("DateScreen", () => {
  const setRideInfosMock = jest.fn();

  const RideContextValue = {
    RideInfos: {
      date: new Date(),
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

  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <RideContext.Provider value={RideContextValue}>
          <DateScreen />
        </RideContext.Provider>
      </ThemeProvider>
    );

  beforeEach(() => {
    setRideInfosMock.mockClear();
  });

  test("render inputs correctly with initial date from context", () => {
    const currentDate = RideContextValue?.RideInfos.date
      ? new Date(RideContextValue.RideInfos.date)
      : new Date();
    const { getByTestId } = renderComponent();
    const dateInput = getByTestId("dayInput");
    const timeInput = getByTestId("timeInput");
    const formattedDate = currentDate.toLocaleDateString("pt-BR");
    const formattedTime = currentDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(dateInput.props.value).toBe(formattedDate);
    expect(timeInput.props.value).toBe(formattedTime);
  });
});
