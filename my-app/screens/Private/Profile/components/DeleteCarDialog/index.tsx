import { Button, Dialog, useTheme } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { View } from "react-native";
import Text from "../../../../../components/Text";

interface IDeleteCarDialog {
  car: ICar;
  isVisible: boolean;
  onBackdropPress: () => void;
}

const DeleteCarDialog = ({
  car,
  isVisible,
  onBackdropPress,
}: IDeleteCarDialog) => {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle">Deseja mesmo excluir este veículo?</Text>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Button onPress={onBackdropPress} buttonStyle={{ width: "80%" }} color="warning">
          Voltar
        </Button>
        <Button buttonStyle={{ width: "80%" }} type="outline">
          Excluir
        </Button>
      </View>
    </Dialog>
  );
};

export default DeleteCarDialog;
