import { render, screen } from "@testing-library/react-native";
import Map from ".";
import { locationContext } from "../../Providers/LocationProvider";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../styles/theme";

describe("Map", () => {
  it("should show error message when location is not avaiable", () => {
    const mockLocationContext = {
      userPosition: null,
    };

    render(
      <ThemeProvider theme={theme}>
        <locationContext.Provider
          value={{ userPosition: mockLocationContext.userPosition }}
        >
          <Map setLocationText={jest.fn()} setOpenMap={jest.fn()} />
        </locationContext.Provider>
      </ThemeProvider>
    );

    expect(screen.getByText("Não foi possível usar o mapa.")).toBeTruthy();
  });
});
