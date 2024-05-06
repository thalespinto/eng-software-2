import { Input } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  LocationObject,
} from "expo-location";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

const OriginAndDestination = () => {
  const [userPosition, setUserPosition] = useState<LocationObject | null>(null);
  const [openMap, setOpenMap] = useState(false);

  const toggleOpenMap = () => {
    setOpenMap(!openMap);
  };

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
    <ScrollView style={{ paddingTop: 30 }}>
      <Input label="De" onFocus={toggleOpenMap} />
      <Input label="Para" />
      {userPosition && openMap && (
        <MapView
          onPress={(event) => console.log(event.nativeEvent.coordinate)}
          style={{ minHeight: 400 }}
          initialRegion={{
            latitude: userPosition?.coords.latitude,
            longitude: userPosition?.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )}
    </ScrollView>
  );
};

export default OriginAndDestination;
