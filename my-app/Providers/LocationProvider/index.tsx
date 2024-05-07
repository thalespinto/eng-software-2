import { createContext, useEffect, useState } from "react";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

export const locationContext = createContext<{
  userPosition: LocationObject | null;
} | null>(null);

const LocationProvider = ({ children }: { children: any }) => {
  const [userPosition, setUserPosition] = useState<LocationObject | null>(null);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      try {
        const currentPosition = await getCurrentPositionAsync();
        setUserPosition(currentPosition);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <locationContext.Provider value={{ userPosition: userPosition }}>
      {children}
    </locationContext.Provider>
  );
};

export default LocationProvider;
