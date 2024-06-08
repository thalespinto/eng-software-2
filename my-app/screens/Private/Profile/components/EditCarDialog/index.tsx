import { Button, Dialog, useTheme, Input } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { View, Alert } from "react-native";
import Text from "../../../../../components/Text";
import { useState } from "react";
import { api } from "../../../../../server/api";

interface IEditCarDialog {
  car: ICar;
  isVisible: boolean;
  onBackdropPress: () => void;
  onSuccess: () => void;
}

const EditCarDialog = ({ car, isVisible, onBackdropPress, onSuccess }: IEditCarDialog) => {
  const { theme } = useTheme();
  const [modelo, setModelo] = useState(car.modelo);
  const [placa, setPlaca] = useState(car.placa);

  const handleEditCar = async () => {
    try {
      await api.put(`/vehicle/update/${car.id}`, { modelo, placa });
      Alert.alert("Veículo editado com sucesso!");
      onSuccess();
      onBackdropPress();
    } catch (error) {
      console.error("Erro ao editar veículo:", error);
      Alert.alert("Erro ao editar veículo");
    }
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Edite o veículo
      </Text>
      <View style={{ marginTop: 20 }}>
        <Input label="Modelo" value={modelo} onChangeText={setModelo} />
        <Input label="Placa" value={placa} onChangeText={setPlaca} />
        <Button onPress={handleEditCar} color="secondary" uppercase>
          <Text variant="Action" style={{color: theme.colors.white}}>Confirmar</Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default EditCarDialog;
