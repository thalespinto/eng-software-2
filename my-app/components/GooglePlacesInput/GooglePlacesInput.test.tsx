import { render, screen } from "@testing-library/react-native";
import GooglePlacesInput from ".";
import LocationProvider, {
  locationContext,
} from "../../Providers/LocationProvider";

const mockLocationContext = {
  userPosition: {
    coords: {
      accuracy: 100,
      altitude: 61.60000228881836,
      altitudeAccuracy: 100,
      heading: 0,
      latitude: -22.8656529,
      longitude: -43.07392,
      speed: 0,
    },
    mocked: false,
    timestamp: Date.now(),
  },
};

describe("GooglePlaceInputs", () => {
  beforeEach(() => {
    render(
      <locationContext.Provider
        value={{ userPosition: mockLocationContext.userPosition }}
      >
        <GooglePlacesInput placeHolder="Teste" />
      </locationContext.Provider>
    );
  });

  it("should render correctly", () => {
    
    expect(screen.getByPlaceholderText("Teste")).toBeTruthy();
  });
});
