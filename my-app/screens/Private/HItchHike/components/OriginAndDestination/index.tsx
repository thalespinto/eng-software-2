import { View } from "react-native";
import { useRef, useState } from "react";
import { IHike } from "../../../../../interfaces/IHike";
import GooglePlacesInput from "../../../../../components/GooglePlacesInput";

interface IOriginAndDestination {
  setHikeInfos: React.Dispatch<React.SetStateAction<Partial<IHike>>>;
}

const OriginAndDestination = ({ setHikeInfos }: IOriginAndDestination) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <View style={{ paddingTop: 30 }}>
      <GooglePlacesInput placeHolder="De" setLocationText={setOrigin} />
      <GooglePlacesInput placeHolder="Para" setLocationText={setDestination} />
    </View>
  );
};

export default OriginAndDestination;
