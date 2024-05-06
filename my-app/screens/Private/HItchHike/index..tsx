import { Text, View } from "react-native";
import Stepper from "react-native-stepper-ui";
import PageContainer from "../../../components/PageContainer";

const MyComponent = (props: any) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const content = [
  <OriginAndDestination />,
  <MyComponent title="Component 2" />,
  <MyComponent title="Component 3" />,
  <MyComponent title="Component 4" />,
];
import { useContext, useState } from "react";
import OriginAndDestination from "./components/OriginAndDestination";
import { userContext } from "../../../Providers/UserProvider";

const HitchHike = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <PageContainer>
        <Stepper
          active={activeStep}
          content={content}
          onBack={() => setActiveStep((p) => p - 1)}
          onFinish={() => alert("Finish")}
          onNext={() => setActiveStep((p) => p + 1)}
        />
      </PageContainer>
    </>
  );
};

export default HitchHike;
