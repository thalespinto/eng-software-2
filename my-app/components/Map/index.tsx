import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import { locationContext } from "../../Providers/LocationProvider";
import { useContext } from "react";
import Text from "../Text";
import { Dimensions } from "react-native";

interface IMarker {
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface IMap {
  setLocationText: React.Dispatch<React.SetStateAction<string>>;
  setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map = ({ setLocationText, setOpenMap }: IMap) => {
  const { width, height } = Dimensions.get("window");
  const location = useContext(locationContext);

  const markers: IMarker[] = [
    {
      name: "UFF - Campus Praia Vermelha",
      coordinate: {
        latitude: -22.90492177659939,
        longitude: -43.13179544942924,
      },
    },
    {
      name: "UFF - Campus gragoáta",
      coordinate: {
        latitude: -22.89833961313873,
        longitude: -43.13233189121773,
      },
    },
  ];

  const handleOnPress = (e: MarkerPressEvent, marker: IMarker) => {
    setLocationText(marker.name);
    setOpenMap(false);
  };

  return (
    <>
      {location?.userPosition ? (
        <MapView
          onPress={(event) => console.log(event.nativeEvent.coordinate)}
          style={{ width, height }}
          initialRegion={{
            latitude: location?.userPosition?.coords.latitude,
            longitude: location?.userPosition?.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.name}
              onPress={(e) => handleOnPress(e, marker)}
            />
          ))}
        </MapView>
      ) : (
        <Text>Não foi possível usar o mapa.</Text>
      )}
    </>
  );
};

export default Map;
