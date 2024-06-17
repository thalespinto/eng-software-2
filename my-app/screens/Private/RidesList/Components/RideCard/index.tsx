import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import Text from "../../../../../components/Text";
import { useState } from "react";
import ManageRideDialog from "../ManageRideDialog";

interface Ride {
  id_carona: number;
  origem: string;
  destino: string;
  data: string;
  horario_de_partida: string;
  horario_de_retorno?: string;
  motorista: {
    id: number;
    nome: string;
  };
}

interface IRideCard {
  role: string;
  ride: Ride;
  fetchRides: () => void;
  userId: number; // Adicionando o ID do usuário logado como uma prop
}

const RideCard = ({ role, ride, fetchRides, userId }: IRideCard) => {
  const { theme } = useTheme();
  const [openManageRideDialog, setOpenManageRideDialog] = useState(false);

  // Função para alternar a visibilidade do diálogo
  const toggleOpenManageRideDialog = () => {
    setOpenManageRideDialog(!openManageRideDialog);
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
        <Text variant="Subtitle">{ride.motorista.nome}</Text>
        <Text>Origem: {ride.origem}</Text>
        <Text>Destino: {ride.destino}</Text>
        <Text>Data: {ride.data}</Text>
        <Text>Hora de Partida: {ride.horario_de_partida}</Text>
      </TouchableOpacity>
      <ManageRideDialog
        isVisible={openManageRideDialog}
        onBackdropPress={toggleOpenManageRideDialog}
        role={role}
        ride={ride}
        fetchRides={fetchRides}
        userId={userId} // Passando o ID do usuário logado
      />
    </>
  );
};

export default RideCard;
