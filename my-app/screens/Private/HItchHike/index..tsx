import { Text, View } from "react-native";
import Stepper from "../../../components/Stepper";
import { useState } from "react";
import OriginAndDestinationScreen from "./components/OriginAndDestinationScreen";
import DateScreen from "./components/DateScreen";
import { useTheme } from "@rneui/themed";
import HikeProvider from "./Provider/HikeProvider";
import PassangersScreen from "./components/PassangersScreen";
import ChooseHikeScreen from "./components/ChooseHikeScreen";
import ConfirmHikeScreen from "./components/ConfirmHikeScreen";

const MyComponent = (props: any) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const HitchHike = () => {
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(0);

  const content = [
    <OriginAndDestinationScreen />,
    <DateScreen />,
    <PassangersScreen />,
    <ChooseHikeScreen />,
    <ConfirmHikeScreen />,
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
        <HikeProvider>
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
        </HikeProvider>
      </View>
    </>
  );
};

export default HitchHike;
