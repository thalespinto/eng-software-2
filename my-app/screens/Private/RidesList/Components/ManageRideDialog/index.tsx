import { Button, Dialog, useTheme, Icon } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import RequestCard from "../ResquestCard";
import RescheduleRideDialog from "../RescheduleRideDialog";
import { useState } from "react";
import RateParticipantesDialog from "../RateParticipantsDialog";
import { cancelarCarona } from "../../../../../server/api"; 

interface Ride {
  id_carona: number;
  origem: string;
  destino: string;
  data: string;
  horario_de_partida: string;
  horario_de_retorno?: string;
  motorista?: {
    id: number;
    nome: string;
  };
}

interface IManageRideDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
  role: string;
  ride: Ride;
  fetchRides: () => void;
  userId: number; // Adicionando o ID do usuário logado como uma prop
}

const ManageRideDialog = ({
  isVisible,
  onBackdropPress,
  role,
  ride,
  fetchRides,
  userId // Recebendo o ID do usuário logado
}: IManageRideDialog) => {
  const { theme } = useTheme();
  const [openRescheduleRideDialog, setOpenRescheduleRideDialog] = useState(false);
  const [openRateParticipantsDialog, setOpenRateParticipantsDialog] = useState(false);

  const isMotorista = role === "Motorista";

  // Função para alternar a visibilidade do diálogo de reagendamento
  const toggleOpenRescheduleRideDialog = () => {
    setOpenRescheduleRideDialog(!openRescheduleRideDialog);
  };

  // Função para alternar a visibilidade do diálogo de avaliação dos participantes
  const toggleOpenRateParticipantsDialog = () => {
    setOpenRateParticipantsDialog(!openRateParticipantsDialog);
  };

  const handleCancelRide = async () => {
    try {
      await cancelarCarona(ride.id_carona);
      fetchRides();
      onBackdropPress();
    } catch (error) {
      console.error("Erro ao cancelar carona:", error);
    }
  };

  return (
    <>
      <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
        <View style={{ marginTop: 20 }}>
          <View
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
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Icon name="person" />
              <Icon name="chat" onPress={() => {}} />
            </View>
            <Text variant="Subtitle">{ride.motorista?.nome || "Nome não disponível"}</Text>
            <Text>Origem: {ride.origem}</Text>
            <Text>Destino: {ride.destino}</Text>
            <Text>Ida: {ride.data} - {ride.horario_de_partida}</Text>
            {ride.horario_de_retorno && <Text>Retorno: {ride.horario_de_retorno}</Text>}
          </View>
          {isMotorista && userId === ride.motorista?.id && (
            <>
              <View style={{ marginTop: 10 }}>
                <Text variant="Subtitle">Solicitações</Text>
                <RequestCard />
                <RequestCard />
              </View>
              <Button
                buttonStyle={{ marginTop: 10 }}
                onPress={toggleOpenRescheduleRideDialog}
                color="secondary"
                uppercase
              >
                <Text variant="Action" style={{ color: theme.colors.white }}>
                  Remarcar Viagem
                </Text>
              </Button>
            </>
          )}
          <Button
            buttonStyle={{ marginTop: 10 }}
            onPress={handleCancelRide}
            color="warning"
            uppercase
          >
            <Text variant="Action" style={{ color: theme.colors.white }}>
              Cancelar Viagem
            </Text>
          </Button>
          <Button
            buttonStyle={{ marginTop: 10 }}
            onPress={toggleOpenRateParticipantsDialog}
            color="secondary"
            uppercase
          >
            <Text variant="Action" style={{ color: theme.colors.white }}>
              Avaliar Participantes
            </Text>
          </Button>
        </View>
      </Dialog>
      {isMotorista && (
        <RescheduleRideDialog
          isVisible={openRescheduleRideDialog}
          onBackdropPress={toggleOpenRescheduleRideDialog}
        />
      )}
      <RateParticipantesDialog
        isVisible={openRateParticipantsDialog}
        onBackdropPress={toggleOpenRateParticipantsDialog}
      />
    </>
  );
};

export default ManageRideDialog;
