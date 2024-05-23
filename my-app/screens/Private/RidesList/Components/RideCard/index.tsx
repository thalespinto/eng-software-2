import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import Text from "../../../../../components/Text";
import { useState } from "react";
import ManageRideDialog from "../ManageRideDialog";

interface IRideCard {
  role: string;
}

const RideCard = ({ role }: IRideCard) => {
  const { theme } = useTheme();
  const [openManageRideDialog, setOpenManageRideDialog] = useState(false);

  const toggleOpenManageRideDialog = () => {
    setOpenManageRideDialog(!openManageRideDialog);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          borderWidth: 0.8,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 10,
          gap: 5,
        }}
        onPressIn={() => toggleOpenManageRideDialog()}
      >
        <Icon name="person" />
        <Text variant="Subtitle">Nome do Motorista</Text>
        <Text>Origem: Tal lugar</Text>
        <Text>Destino: Tal lugar</Text>
      </TouchableOpacity>
      <ManageRideDialog
        isVisible={openManageRideDialog}
        onBackdropPress={toggleOpenManageRideDialog}
        role={role}
      />
    </>
  );
};

export default RideCard;
