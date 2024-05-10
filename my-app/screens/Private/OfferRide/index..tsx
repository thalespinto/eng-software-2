import { Text, View } from "react-native";
import Stepper from "../../../components/Stepper";
import { useState } from "react";
import OriginAndDestinationScreen from "./components/OriginAndDestinationScreen";
import DateScreen from "./components/DateScreen";
import CNHScreen from "./components/CNHScreen";
import AddV from "./components/AddVehicle";
import { useTheme } from "@rneui/themed";
import RideProvider from "./Provider/RideProvider";

const MyComponent = (props: any) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const OfferRide = () => {
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(0);

  const content = [
    <CNHScreen />,
    <AddV />,
    <OriginAndDestinationScreen />,
    <DateScreen />,

    <MyComponent title="Component 4" />,
  ];

  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.white,
          padding: 5,
          paddingTop: 50,
        }}
      >
        <RideProvider>
          <Stepper
            active={activeStep}
            content={content}
            onBack={() => {
              setActiveStep((p) => p - 1);
            }}
            onFinish={() => alert("Finish")}
            onNext={() => {
              setActiveStep((p) => p + 1);
            }}
          />
        </RideProvider>
      </View>
    </>
  );
};

export default OfferRide;
