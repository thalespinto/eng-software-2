import { Icon, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import { ICar } from "../../../../../interfaces/ICar";

const CarCard = () => {
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
      <Icon name="commute" size={24} />
      <Text variant="Body">Modelo: Corolla</Text>
      <Text variant="Body">Placa: 12312312</Text>
    </View>
  );
};

export default CarCard;
