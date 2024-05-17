import { Button, Dialog, useTheme, Input } from "@rneui/themed";
import { ICar } from "../../../../../interfaces/ICar";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import { Rating } from "react-native-ratings";
import CarCard from "../CarCard";
import ConfirmedPassangersCard from "../ConfirmedPassangersCard";

interface IHikeDetailsDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const HikeDetailsDialog = ({
  isVisible,
  onBackdropPress,
}: IHikeDetailsDialog) => {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Detalhes da viagem
      </Text>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Motorista: Fulano</Text>
          <Rating
            imageSize={32}
            readonly
            startingValue={3.5}
            tintColor={theme.colors.white}
          />
          <Text>De: Tal lugar ali</Text>
          <Text>Para: Tal lugar ali</Text>
        </View>
        <CarCard />
        <ConfirmedPassangersCard/>
        <Button buttonStyle={{marginTop: 10}} onPress={onBackdropPress} color="secondary" uppercase>
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Confirmar
          </Text>
        </Button>
        <Button buttonStyle={{marginTop: 10}} onPress={onBackdropPress} color="warning" uppercase>
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Voltar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default HikeDetailsDialog;
