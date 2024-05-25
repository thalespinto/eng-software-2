import { ScrollView } from "react-native";
import PageContainer from "../../../components/PageContainer";
import RideCard from "./Components/RideCard";

const RidesList = () => {
  return (
    <>
      <PageContainer>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <RideCard role={"Motorista"} />
          <RideCard role={"Passageiro"} />
          <RideCard role={"Passageiro"} />
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default RidesList;
