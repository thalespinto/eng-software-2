import { Button, Dialog, useTheme, Input } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { Alert, View } from "react-native";
import Text from "../../../../../components/Text";
import { useState, useContext } from "react";
import { api } from "../../../../../server/api";
import { userContext } from "../../../../../Providers/UserProvider";

interface IAddCarDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
  onSuccess: () => void;
}

const AddCarDialog = ({ isVisible, onBackdropPress, onSuccess }: IAddCarDialog) => {
  const { theme } = useTheme();
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const userInfos = useContext(userContext);

  const handleAddCar = async () => {
    try {
    const userId = userInfos?.user?.id;

    await api.post("/vehicle/create", { modelo, placa, id_usuario: userId, });

    Alert.alert("Veículo cadastrado com sucesso!");
    onSuccess();
    onBackdropPress();
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Alert.alert("Erro ao cadastrar veículo");
    }
  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Insira os dados do veículo
      </Text>
      <View style={{ marginTop: 20 }}>
        <Input label="Modelo" value={modelo} onChangeText={setModelo} />
        <Input label="Placa" value={placa} onChangeText={setPlaca} />
        <Button onPress={handleAddCar} color="secondary" uppercase>
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Confirmar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default AddCarDialog;
