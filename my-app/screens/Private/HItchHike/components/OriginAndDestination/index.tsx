import { Icon, Input } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { useRef, useState } from "react";
import Map from "../../../../../components/Map";
import { IHike } from "../../../../../interfaces/IHike";

interface IOriginAndDestination {
  setHikeInfos: React.Dispatch<React.SetStateAction<Partial<IHike>>>;
}

const OriginAndDestination = ({ setHikeInfos }: IOriginAndDestination) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [openMap, setOpenMap] = useState(false);
  const [picking, setPicking] = useState("");

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  return (
    <ScrollView style={{ paddingTop: 30 }}>
      {openMap && (
        <Map
          setLocationText={picking === "origin" ? setOrigin : setDestination}
          setOpenMap={setOpenMap}
        />
      )}
      <Input
        ref={originRef}
        label="De"
        value={origin}
        onChange={(e) => {
          setOrigin(e.nativeEvent.text);
          setHikeInfos({ origin: e.nativeEvent.text });
        }}
        rightIcon={
          <Icon
            name="map"
            onPressIn={() => {
              setPicking("origin");
              setOpenMap(true);
            }}
          />
        }
      />
      <Input
        ref={destinationRef}
        label="Para"
        value={destination}
        onChange={(e) => {
          setDestination(e.nativeEvent.text);
          setHikeInfos({ destination: e.nativeEvent.text });
        }}
        rightIcon={
          <Icon
            name="map"
            onPressIn={() => {
              setPicking("destination");
              setOpenMap(true);
            }}
          />
        }
      />
    </ScrollView>
  );
};

export default OriginAndDestination;
