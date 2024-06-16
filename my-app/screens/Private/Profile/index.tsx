import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import PageContainer from "../../../components/PageContainer";
import Text from "../../../components/Text";
import { Avatar, Button, useTheme, Icon } from "@rneui/themed";
import CarCard from "./components/CarCard";
import { useContext, useEffect, useState } from "react";
import AddCarDialog from "./components/AddCardDialog";
import { userContext } from "../../../Providers/UserProvider";
import { authContext } from "../../../Providers/AuthProvider";
import { Rating } from "react-native-ratings";
import { getUserVehicles, getUserInfo } from "../../../server/api";
import { ICar } from "../../../interfaces/ICar";

const Profile = () => {
  const authInfos = useContext(authContext); // Obtém informações de autenticação do contexto authContext
  const userInfos = useContext(userContext); // Obtém informações do usuário do contexto userContext
  const { theme } = useTheme(); 
  const nomeCompleto = userInfos?.user?.nome; // Obtém o nome completo do usuário
  let initials = ""; 

  if (nomeCompleto) {
    const partesNome = nomeCompleto.split(" "); 
    initials = partesNome[0].charAt(0).toUpperCase(); 

    if (partesNome.length > 1) {
      initials += partesNome[1].charAt(0).toUpperCase();
    } 
  }

  const [openAddCarDialog, setOpenAddCarDialog] = useState(false); // Estado para controlar a visibilidade do diálogo de adicionar carro
  const [veiculos, setVeiculos] = useState<ICar[]>([]); // Estado para armazenar os veículos do usuário
  const [notaMedia, setNotaMedia] = useState(5); // Estado para armazenar a nota média do usuário

  // Função para alternar a visibilidade do diálogo de adicionar carro
  const toggleAddCarDialog = () => {
    setOpenAddCarDialog(!openAddCarDialog);
  };

  // Função para buscar os veículos do usuário
  const fetchUserVehicles = async () => {
    try {
      if (userInfos?.user?.id) { // Verifica se o ID do usuário está disponível
        const userVehicles = await getUserVehicles(userInfos?.user?.id); // Chama a função getUserVehicles com o ID do usuário
        setVeiculos(userVehicles); // Atualiza o estado veiculos com os veículos retornados
      }
    } catch (error) {
      console.error("Erro ao buscar veículos do usuário:", error); // Exibe um erro caso a busca falhe
    }
  };

  // Função para buscar as informações do usuário
  const fetchUserInfo = async () => {
    try {
      if (userInfos?.user?.id) { // Verifica se o ID do usuário está disponível
        const userInfo = await getUserInfo(userInfos?.user?.id); // Chama a função getUserInfo com o ID do usuário
        setNotaMedia(userInfo.nota_media); // Atualiza o estado notaMedia com a nota média retornada
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error); // Exibe um erro caso a busca falhe
    }
  };

  // useEffect é executado quando o componente é montado ou quando o ID do usuário muda
  useEffect(() => {
    fetchUserVehicles(); // Chama a função para buscar os veículos do usuário
    fetchUserInfo(); // Chama a função para buscar as informações do usuário
  }, [userInfos?.user?.id]); // Dependência do ID do usuário para re-executar as funções quando ele muda


  return (
    <PageContainer>
      <View style={styles.profileHeader}>
        <View style={styles.nameAndRating}>
          <Text variant="Title">{userInfos?.user?.nome}</Text>
          <Rating
            imageSize={32}
            readonly
            startingValue={notaMedia}
            tintColor={theme.colors.white}
          />
        </View>
        <View style={styles.avatarAndCPF}>
          { userInfos?.user?.profile_pic ? (
            <Avatar
              size={120}
              rounded
              source={{ uri: userInfos?.user?.profile_pic }}
            />
          ) : (
            initials && (
              <Avatar
                size={120}
                rounded
                title={initials}
                containerStyle={{
                  backgroundColor: theme.colors.grey0,
                }}
              />
            )
          )}

          <Text style={[styles.cpfText, { backgroundColor: theme.colors.primary }]}>
            CPF: {userInfos?.user?.cpf}
          </Text>
        </View>
      </View>
      <View style={styles.carsListContainer}>
        <Text variant="Subtitle">Seus Veículos:</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <Button
            type="clear"
            style={styles.addButton}
            icon={<Icon name="add" />}
            uppercase
            buttonStyle={styles.buttonStyle}
            onPress={toggleAddCarDialog}
          >
            Adicionar Veículo
          </Button>
          {veiculos.map((veiculo) => (
            <CarCard key={veiculo.id} car={veiculo} fetchUserVehicles={fetchUserVehicles} />
          ))}
        </ScrollView>
      </View>
      <AddCarDialog
        isVisible={openAddCarDialog}
        onBackdropPress={toggleAddCarDialog}
        onSuccess={fetchUserVehicles}
      />
      <Button
        buttonStyle={styles.signOutButton}
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
  nameAndRating: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  avatarAndCPF: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  cpfText: {
    padding: 5,
    borderRadius: 18,
    alignSelf: 'flex-start',
    marginLeft: -1, 
  },
  carsListContainer: {
    marginTop: 40,
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  addButton: {
    width: 120,
  },
  buttonStyle: {
    width: 200,
  },
  signOutButton: {
    marginTop: 20,
    marginBottom: 150,
  },
});
