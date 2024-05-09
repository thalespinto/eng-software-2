import { Text, View } from "react-native";
import Stepper from "../../../components/Stepper";
import { useState } from "react";
import OriginAndDestination from "./components/OriginAndDestination";
import { IHike } from "../../../interfaces/IHike";
import RideDate from "./components/Date";
import { useTheme } from "@rneui/themed";

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
  const [hikeInfos, setHikeInfos] = useState<Partial<IHike>>({});

  const content = [
    <OriginAndDestination setHikeInfos={setHikeInfos} />,
    <RideDate />,
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
        <Stepper
          active={activeStep}
          content={content}
          onBack={() => {
            setActiveStep((p) => p - 1);
            console.log(hikeInfos);
          }}
          onFinish={() => alert("Finish")}
          onNext={() => {
            setActiveStep((p) => p + 1);
            console.log(hikeInfos);
          }}
        />
      </View>
    </>
  );
};

export default HitchHike;
