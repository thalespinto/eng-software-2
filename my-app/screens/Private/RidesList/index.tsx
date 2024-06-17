import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import PageContainer from "../../../components/PageContainer";
import RideCard from "./Components/RideCard";
import useFetchAllRides from "./useFetchRides";

const RidesList = () => {
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
            <RideCard key={index} role={"Passageiro"} ride={ride} fetchRides={fetchRides} />
          ))}
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default RidesList;
