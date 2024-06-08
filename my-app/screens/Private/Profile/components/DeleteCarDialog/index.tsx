import { Button, Dialog, useTheme } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { View, Alert } from "react-native";
import Text from "../../../../../components/Text";
import { deleteUserVehicle } from "../../../../../server/api";

interface IDeleteCarDialog {
  car: ICar;
  isVisible: boolean;
  onBackdropPress: () => void;
  onSuccess: () => void;
}

const DeleteCarDialog = ({
  car,
  isVisible,
  onBackdropPress,
  onSuccess,
}: IDeleteCarDialog) => {
  const { theme } = useTheme();

  const handleDeleteCar = async () => {
    try {
      await deleteUserVehicle(car.id);
      Alert.alert("Veículo excluído com sucesso!");
      onSuccess();
      onBackdropPress();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      Alert.alert("Erro ao excluir veículo");
    }
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle">Deseja mesmo excluir este veículo?</Text>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Button onPress={onBackdropPress} buttonStyle={{ width: "80%" }} color="warning">
          Voltar
        </Button>
        <Button onPress={handleDeleteCar} buttonStyle={{ width: "80%" }} type="outline">
          Excluir
        </Button>
      </View>
    </Dialog>
  );
};

export default DeleteCarDialog;
