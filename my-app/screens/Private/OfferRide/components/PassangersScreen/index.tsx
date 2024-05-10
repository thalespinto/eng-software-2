import { Button, Icon } from "@rneui/themed";
import PassangersList from "./PassangersList";
import { useContext, useEffect, useState } from "react";
import AddPassangerDialog from "./AddPassangerDialog";
import { hikeContext as hc } from "../../Provider/HikeProvider";
import { userContext as uc } from "../../../../../Providers/UserProvider";

const PassangersScreen = () => {
  const hikeContext = useContext(hc);
  const userContext = useContext(uc);

  const [openAddPassangerDialog, setopenAddPassangerDialog] = useState(false);

  useEffect(() => {
    hikeContext?.setPassangers([userContext?.user!]);
  }, []);

  return (
    <>
      <Button
        type="clear"
        icon={<Icon name="add" />}
        uppercase
        buttonStyle={{ width: 210, marginTop: 20 }}
        onPress={() => setopenAddPassangerDialog(true)}
      >
        Adicionar Passageiro
      </Button>
      <PassangersList />
      {openAddPassangerDialog && (
        <AddPassangerDialog
          isVisible={openAddPassangerDialog}
          onBackdropPress={() => setopenAddPassangerDialog(false)}
        />
      )}
    </>
  );
};

export default PassangersScreen;
