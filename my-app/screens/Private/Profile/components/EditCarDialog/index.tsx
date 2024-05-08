import { Button, Dialog, useTheme, Input } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { View } from "react-native";
import Text from "../../../../../components/Text";

interface IEditCarDialog {
  car: ICar;
  isVisible: boolean;
  onBackdropPress: () => void;
}

const EditCarDialog = ({ car, isVisible, onBackdropPress }: IEditCarDialog) => {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Edite o veículo
      </Text>
      <View style={{ marginTop: 20 }}>
        <Input label="Modelo" defaultValue={car.modelo} />
        <Input label="Placa" defaultValue={car.placa} />
        <Button onPress={onBackdropPress} color="secondary" uppercase>
          <Text variant="Action" style={{color: theme.colors.white}}>Confirmar</Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default EditCarDialog;
