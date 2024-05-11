import { View } from "react-native";
import GooglePlacesInput from "../../../../../components/GooglePlacesInput";

const OriginAndDestinationScreen = () => {
  return (
    <View style={{ paddingTop: 30 }}>
      <GooglePlacesInput placeHolder="De" />
      <GooglePlacesInput placeHolder="Para" />
    </View>
  );
};

export default OriginAndDestinationScreen;
