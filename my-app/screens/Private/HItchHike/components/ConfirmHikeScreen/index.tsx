import { View } from "react-native";
import PageContainer from "../../../../../components/PageContainer";
import Text from "../../../../../components/Text";
import { Rating } from "react-native-ratings";
import { Icon, useTheme } from "@rneui/themed";

const ConfirmHikeScreen = () => {
  const { theme } = useTheme();

  return (
    <PageContainer>
      <Text variant="Title" style={{ textAlign: "center" }}>
        Confira os dados da viagem
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderWidth: 0.5,
          borderRadius: 8,
          padding: 10,
          backgroundColor: theme.colors.primary,
          gap: 10,
          marginTop: 20
        }}
      >
        <Text>Motorista: Fulano</Text>
        <Rating
          imageSize={32}
          readonly
          startingValue={3.5}
          tintColor={theme.colors.primary}
        />
        <View>
          <Text>De: Tal lugar ali logo ai</Text>
          <Text>Para: Tal lugar ali logo ai</Text>
        </View>
        <Text> 21/12/2024 - 19:00</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderWidth: 0.5,
          borderRadius: 8,
          padding: 10,
          backgroundColor: theme.colors.primary,
          gap: 10,
          marginTop: 10
        }}
      >
        <Icon name="people" />
        <Text>Você</Text>
        <Text>Você</Text>
        <Text>Você</Text>
      </View>
    </PageContainer>
  );
};

export default ConfirmHikeScreen;
