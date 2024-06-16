import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import Text from "../../../../../components/Text";
import { useState } from "react";
import ManageRideDialog from "../ManageRideDialog";

// Define uma interface para as propriedades esperadas pelo componente RideCard
interface IRideCard {
  role: string;
}

// Define o componente RideCard, que recebe uma prop 'role'
const RideCard = ({ role }: IRideCard) => {
  const { theme } = useTheme(); // Utiliza o hook useTheme para obter o tema atual
  const [openManageRideDialog, setOpenManageRideDialog] = useState(false);

  // Função para alternar a visibilidade do diálogo
  const toggleOpenManageRideDialog = () => {
    setOpenManageRideDialog(!openManageRideDialog); // Inverte o estado atual de openManageRideDialog
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          borderWidth: 0.8,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 10,
          gap: 5,
        }}
        onPressIn={() => toggleOpenManageRideDialog()}
      >
        <Icon name="person" />
        <Text variant="Subtitle">Nome do Motorista</Text>
        <Text>Origem: Tal lugar</Text>
        <Text>Destino: Tal lugar</Text>
      </TouchableOpacity>
      <ManageRideDialog
        isVisible={openManageRideDialog}
        onBackdropPress={toggleOpenManageRideDialog}
        role={role}
      />
    </>
  );
};

export default RideCard;
