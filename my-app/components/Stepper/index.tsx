import { Button } from "@rneui/themed";
import React, { FC, useState, ReactElement } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native";

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map((val) => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
  } = props;
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };
  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "grey",
                    opacity: 1,
                    marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: "#1976d2",
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: search(i, step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}
              >
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      stepTextStyle,
                    ]}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      stepTextStyle,
                    ]}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {content[active]}
      </ScrollView>
      {showButton && (
        <View
          style={{
            flexDirection: "column",
            gap: 5,
          }}
        >
          {content.length - 1 !== active && (
            <Button
              buttonStyle={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "#1976d2",
                  alignSelf: "flex-start",
                  marginRight: 10,
                  width: "100%",
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>
                Continuar
              </Text>
            </Button>
          )}

          {content.length - 1 === active && (
            <Button
              buttonStyle={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "#1976d2",
                  alignSelf: "flex-start",
                  width: "100%",
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>
                Confirmar
              </Text>
            </Button>
          )}
          {active !== 0 && (
            <Button
              buttonStyle={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: "flex-start",
                  marginRight: 10,
                  width: "100%",
                },
                buttonStyle,
                {
                  backgroundColor: "#a1a1a1",
                },
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>Voltar</Text>
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
