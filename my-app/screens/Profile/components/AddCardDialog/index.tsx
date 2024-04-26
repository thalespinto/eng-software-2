import { Button, Dialog, useTheme, Input } from "@rneui/themed";
import { ICar } from "../../../../interfaces/ICar";
import { View } from "react-native";
import Text from "../../../../components/Text";

interface IAddCarDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const AddCarDialog = ({ isVisible, onBackdropPress }: IAddCarDialog) => {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Insira os dados do veículo
      </Text>
      <View style={{ marginTop: 20 }}>
        <Input label="Modelo" />
        <Input label="Placa" />
        <Button onPress={onBackdropPress} color="secondary" uppercase>
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Confirmar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default AddCarDialog;
