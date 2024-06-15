import { Button, Icon, useTheme } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import { ICar } from "../../../../../interfaces/ICar";
import { useState } from "react";
import DeleteCarDialog from "../DeleteCarDialog";
import EditCarDialog from "../EditCarDialog";

interface CarCardProps {
  car: ICar;
  fetchUserVehicles: () => Promise<void>;
}

const CarCard = ({ car, fetchUserVehicles }: CarCardProps) => {
  const { theme } = useTheme();

  const [openDeleteCarDialog, setOpenDeleteCarDialog] = useState(false);
  const [openEditCarDialog, setOpenEditCarDialog] = useState(false);

  const toggleDeleteCarDialog = () => {
    setOpenDeleteCarDialog(!openDeleteCarDialog);
  };

  const toggleEditCarDialog = () => {
    setOpenEditCarDialog(!openEditCarDialog);
  };

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 10,
        gap: 5,
        marginTop: 10,
      }}
    >
      <Icon name="commute" size={36} />
      <Text variant="Subtitle">Modelo: {car.modelo}</Text>
      <Text variant="Subtitle">Placa: {car.placa}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button
          buttonStyle={{ width: "80%", gap: 10 }}
          type="outline"
          iconRight
          icon={<Icon name="edit" />}
          onPress={toggleEditCarDialog}
        >
          <Text>Editar</Text>
        </Button>
        <Button
          buttonStyle={{ width: "80%", gap: 10 }}
          type="outline"
          iconRight
          icon={<Icon name="delete-outline" />}
          onPress={toggleDeleteCarDialog}
        >
          <Text>Excluir</Text>
        </Button>
      </View>
      <DeleteCarDialog
        car={car}
        isVisible={openDeleteCarDialog}
        onBackdropPress={toggleDeleteCarDialog}
        onSuccess={fetchUserVehicles}
      />
      <EditCarDialog
        car={car}
        isVisible={openEditCarDialog}
        onBackdropPress={toggleEditCarDialog}
        onSuccess={fetchUserVehicles}
      />
    </View>
  );
};

export default CarCard;
