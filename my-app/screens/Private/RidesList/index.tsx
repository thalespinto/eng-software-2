import React, { useContext } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import PageContainer from "../../../components/PageContainer";
import RideCard from "./Components/RideCard";
import useFetchAllRides from "./useFetchRides";
import { userContext } from "../../../Providers/UserProvider";

const RidesList = () => {
  const userInfos = useContext(userContext);
  const userId = userInfos?.user?.id ?? 0;
  const { rides, loading, error, fetchRides } = useFetchAllRides();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
          {rides.map((ride, index) => (
            <RideCard
              key={index}
              role={ride.motorista.id === userId ? "Motorista" : "Passageiro"}
              ride={ride}
              fetchRides={fetchRides}
              userId={userId}
            />
          ))}
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default RidesList;
