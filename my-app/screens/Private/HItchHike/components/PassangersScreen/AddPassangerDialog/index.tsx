import { Button, Dialog, useTheme, Input, Icon } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import Text from "../../../../../../components/Text";
import SearchedPassangerCard from "../SearchedPassangerCard";

interface IAddPassangerDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const AddPassangerDialog = ({
  isVisible,
  onBackdropPress,
}: IAddPassangerDialog) => {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text variant="Subtitle" style={{ textAlign: "center" }}>
        Adicione passageiros para viajar com você
      </Text>
      <View style={{ marginTop: 20 }}>
        <Input label="CPF" rightIcon={<Icon name="search" />} />
        <ScrollView style={{maxHeight: 150}}>
          <SearchedPassangerCard />
          <SearchedPassangerCard />
          <SearchedPassangerCard />
        </ScrollView>
        <Button
          onPress={onBackdropPress}
          color="secondary"
          uppercase
          buttonStyle={{
            marginTop: 10
          }}
        >
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Confirmar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default AddPassangerDialog;
