import { View } from "react-native";
import Text from "../../../../../components/Text";
import AvailableHikesList from "../AvailableHikesList";

const ChooseHikeScreen = () => {
  return (
    <View>
      <Text variant="Title" style={{ textAlign: "center", marginTop: 20 }}>
        Caronas disponíveis
      </Text>
      <AvailableHikesList />
    </View>
  );
};

export default ChooseHikeScreen;
