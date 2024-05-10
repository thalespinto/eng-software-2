import { Icon, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../../components/Text";

const SearchedPassangerCard = () => {
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
            backgroundColor: theme.colors.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          padding: 10,
          gap: 5,
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <Icon name="person" />
        <Text>Nome: sadasdasdas</Text>
        <Text>CPF: dasddasdsa</Text>
      </View>
    </>
  );
};

export default SearchedPassangerCard;
