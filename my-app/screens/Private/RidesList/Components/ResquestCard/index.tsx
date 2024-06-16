import { View } from "react-native";
import Text from "../../../../../components/Text";
import { Rating } from "react-native-ratings";
import { Icon, useTheme } from "@rneui/themed";

const RequestCard = () => {
  const { theme } = useTheme(); // Utiliza o hook useTheme para obter o tema atual

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>Relampago Marq.</Text>
        <Rating
          imageSize={28}
          readonly
          startingValue={3.5}
          tintColor={theme.colors.white}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Icon name="check" />
        <Icon name="delete" />
      </View>
    </View>
  );
};

export default RequestCard;
