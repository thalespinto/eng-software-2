import { Text, View } from "react-native";
import Stepper from "../../../components/Stepper";
import { useState } from "react";
import OriginAndDestination from "./components/OriginAndDestination";
import HikeDate from "./components/Date";
import { useTheme } from "@rneui/themed";
import HikeProvider from "./Provider/HikeProvider";

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
    <OriginAndDestination />,
    <HikeDate />,
    <MyComponent title="Component 3" />,
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
