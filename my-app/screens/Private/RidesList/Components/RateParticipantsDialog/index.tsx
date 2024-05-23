import { Button, Dialog, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import RateParticipantCard from "../RateParticipantCard";

interface IRateParticipantesDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const RateParticipantesDialog = ({
  isVisible,
  onBackdropPress,
}: IRateParticipantesDialog) => {
  const { theme } = useTheme();

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
