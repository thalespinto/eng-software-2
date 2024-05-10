import { Icon, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../../components/Text";

interface IPassangerListItems {
  name: string;
  cpf: string;
  showBin?: boolean;
}

const PassangersListItems = ({
  name,
  cpf,
  showBin = true,
}: IPassangerListItems) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon name="person" size={32} />
        <Text>{name}</Text>
      </View>

      {showBin && <Icon name="delete" size={32} color={theme.colors.error} />}
    </View>
  );
};

export default PassangersListItems;
