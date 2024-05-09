import { ScrollView } from "react-native";
import PasssangersListItems from "../PassangersListItems";
import { useContext } from "react";
import { userContext as uc } from "../../../../../../Providers/UserProvider";

const PassangersList = () => {
  const userContext = useContext(uc);

  return (
    <ScrollView>
      <PasssangersListItems
        name={userContext?.user?.nome!}
        cpf={userContext?.user?.cpf!}
        showBin={false}
      />
      <PasssangersListItems name="Só mais um" cpf="213213" />
      <PasssangersListItems name="mais um" cpf="123213" />
    </ScrollView>
  );
};

export default PassangersList;
