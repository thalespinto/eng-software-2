import { Button, Dialog, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import RateParticipantCard from "../RateParticipantCard";

// Define a interface para as propriedades esperadas pelo componente RateParticipantesDialog
interface IRateParticipantesDialog {
  isVisible: boolean; // Propriedade que define se o diálogo está visível 
  onBackdropPress: () => void; // Função chamada quando o fundo do diálogo é pressionado
}

const RateParticipantesDialog = ({
  isVisible,
  onBackdropPress,
}: IRateParticipantesDialog) => {
  const { theme } = useTheme(); // Utiliza o hook useTheme para obter o tema atual

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={{ marginTop: 20, gap: 10 }}>
        <RateParticipantCard />
        <RateParticipantCard />
        <RateParticipantCard />

        <Button
          buttonStyle={{ marginTop: 50 }}
          onPress={onBackdropPress}
          color="secondary"
          uppercase
        >
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Voltar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default RateParticipantesDialog;
