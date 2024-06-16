import { Button, Dialog, useTheme, Icon } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import RequestCard from "../ResquestCard";
import RescheduleRideDialog from "../RescheduleRideDialog";
import { useState } from "react";
import RateParticipantesDialog from "../RateParticipantsDialog";

interface IManageRideDialog {
  isVisible: boolean;
  onBackdropPress: () => void; // Função chamada quando o fundo do diálogo é pressionado
  role: string; // Define o papel do usuário (por exemplo, "Motorista")
}

const ManageRideDialog = ({
  isVisible,
  onBackdropPress,
  role,
}: IManageRideDialog) => {
  const { theme } = useTheme(); // Utiliza o hook useTheme para obter o tema atual
  const [openRescheduleRideDialog, setOpenRescheduleRideDialog] =
    useState(false); // Define o estado para controlar a visibilidade do diálogo de reagendamento
  const [openRateParticipantsDialog, setOpenRateParticipantsDialog] =
    useState(false); // Define o estado para controlar a visibilidade do diálogo de avaliação dos participantes

  const isMotorista = role === "Motorista"; // Verifica se o papel do usuário é "Motorista"

  // Função para alternar a visibilidade do diálogo de reagendamento
  const toggleOpenRescheduleRideDialog = () => {
    setOpenRescheduleRideDialog(!openRescheduleRideDialog); 
  };

  // Função para alternar a visibilidade do diálogo de avaliação dos participantes
  const toggleOpenRateParticipantsDialog = () => {
    setOpenRateParticipantsDialog(!openRateParticipantsDialog); 
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
            <Text variant="Subtitle">Nome do Motorista</Text>
            <Text>Origem: Tal lugar</Text>
            <Text>Destino: Tal lugar</Text>
            <Text>Ida: 01/09/2024 - 19:00</Text>
            <Text>Retorno: 01/09/2024 - 19:00</Text>
          </View>
          {isMotorista && (
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
            onPress={onBackdropPress}
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
