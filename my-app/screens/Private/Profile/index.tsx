import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import PageContainer from "../../../components/PageContainer";
import Text from "../../../components/Text";
import { Avatar, Button, useTheme, Icon } from "@rneui/themed";
import CarCard from "./components/CarCard";
import { veiculos } from "../../../mock/cars";
import { useContext, useState } from "react";
import AddCarDialog from "./components/AddCardDialog";
import { userContext } from "../../../Providers/UserProvider";
import { authContext } from "../../../Providers/AuthProvider";
import { Rating } from "react-native-ratings";

const Profile = () => {
  const authInfos = useContext(authContext);
  const userInfos = useContext(userContext);
  const { theme } = useTheme();
  const nomeCompleto = userInfos?.user?.nome;
  let initials = "";

  if (nomeCompleto) {
    const partesNome = nomeCompleto.split(" ");
    initials = partesNome[0].charAt(0).toUpperCase();

  if (partesNome.length > 1) {
    initials += partesNome[1].charAt(0).toUpperCase(); 
  } 
}

  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);

  const toggleAddCarDialog = () => {
    setOpenAddCarDialog(!openAddCarDialog);
  };

  return (
    <PageContainer>
      <View style={styles.profileHeader}>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text variant="Title">{userInfos?.user?.nome}</Text>
          <Rating
            imageSize={32}
            readonly
            startingValue={3.5}
            tintColor={theme.colors.white}
          />
        </View>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Avatar
            size={120}
            rounded
            title={initials}
            containerStyle={{
              backgroundColor: theme.colors.grey0,
            }}
          />

          <Text
            style={{
              backgroundColor: theme.colors.primary,
              padding: 5,
              borderRadius: 18,
            }}
          >
            CPF: {userInfos?.user?.cpf}
          </Text>
        </View>
      </View>
      <View style={styles.carsListContainer}>
        <Text variant="Subtitle">Seus Veículos:</Text>
        <ScrollView
          style={{
            width: "100%",
            height: 400,
            borderColor: theme.colors.black,
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Button
            type="clear"
            style={{ width: 120 }}
            icon={<Icon name="add" />}
            uppercase
            buttonStyle={{ width: 200 }}
            onPress={toggleAddCarDialog}
          >
            Adicionar Veículo
          </Button>
          {veiculos.map((veiculo) => (
            <CarCard key={veiculo.id} car={veiculo} />
          ))}
        </ScrollView>
      </View>
      <AddCarDialog
        isVisible={openAddCarDialog}
        onBackdropPress={toggleAddCarDialog}
      />
      <Button
        buttonStyle={{ marginTop: 20, marginBottom: 150 }}
        onPress={() => authInfos?.SignOut()}
      >
        Sair
      </Button>
    </PageContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  carsListContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
});
