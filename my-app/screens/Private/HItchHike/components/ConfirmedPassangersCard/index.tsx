import { Icon, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import { ICar } from "../../../../../interfaces/ICar";
import { Rating } from "react-native-ratings";

const ConfirmedPassangersCard = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 10,
        gap: 5,
        marginTop: 10,
      }}
    >
      <Icon name="people" size={24} />
      <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{maxWidth: 120}} variant="Body">Passageiro 1</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={3.5}
          tintColor={theme.colors.white}
        />
      </View>
      <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{maxWidth: 120}} variant="Body">Passageiro 2</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={3.5}
          tintColor={theme.colors.white}
        />
      </View>
    </View>
  );
};

export default ConfirmedPassangersCard;
