import { Icon, useTheme } from "@rneui/themed";
import { Touchable, View } from "react-native";
import Text from "../../../../../components/Text";
import { ICar } from "../../../../../interfaces/ICar";
import { IVehicle } from "../../../../../interfaces/IOffer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ICarCard {
  vehicle: ICar;
  selected: boolean;
  onPress: () => void;
}

const CarCard = ({ vehicle, selected, onPress }: ICarCard) => {
  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback
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
        backgroundColor: selected ? theme.colors.primary : theme.colors.white,
      }}
      onPress={onPress}
    >
      <Icon name="commute" size={24} />
      <Text variant="Body">Modelo: {vehicle.modelo}</Text>
      <Text variant="Body">Placa: {vehicle.placa}</Text>
    </TouchableWithoutFeedback>
  );
};

export default CarCard;
