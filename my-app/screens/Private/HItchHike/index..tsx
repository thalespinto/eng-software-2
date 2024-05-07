import { Text, View } from "react-native";
import Stepper from "../../../components/Stepper";
import PageContainer from "../../../components/PageContainer";
import { useContext, useState } from "react";
import OriginAndDestination from "./components/OriginAndDestination";
import { userContext } from "../../../Providers/UserProvider";
import { IHike } from "../../../interfaces/IHike";

const MyComponent = (props: any) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const HitchHike = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hikeInfos, setHikeInfos] = useState<Partial<IHike>>({});

  const content = [
    <OriginAndDestination setHikeInfos={setHikeInfos} />,
    <MyComponent title="Component 2" />,
    <MyComponent title="Component 3" />,
    <MyComponent title="Component 4" />,
  ];

  return (
    <>
      <PageContainer>
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
      </PageContainer>
    </>
  );
};

export default HitchHike;
