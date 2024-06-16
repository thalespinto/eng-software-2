import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Stepper, { StepperProps } from ".";
import Text from "../Text";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../styles/theme";

const setup = (props: Partial<StepperProps> = {}) => {
  const defaultProps: StepperProps = {
    active: 0,
    content: [<Text key="step1">Step 1</Text>, <Text key="step2">Step 2</Text>],
    onNext: jest.fn(),
    onBack: jest.fn(),
    onFinish: jest.fn(),
    showButton: true,
  };

  return render(
    <ThemeProvider theme={theme}>
      <Stepper {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe("Stepper Component", () => {
  test("should render initial step correctly", () => {
    const { getByText } = setup();

    expect(getByText("Step 1")).toBeTruthy();
  });

  test('should render next step when "Continue" button is pressed', () => {
    const onNext = jest.fn();
    const { getByText, getByTestId } = setup({ onNext });

    fireEvent.press(getByTestId("continueButton"));

    expect(onNext).toHaveBeenCalled();
  });

  test('should call onFinish when on the last step and "Confirmar Viagem" button is pressed', () => {
    const onFinish = jest.fn();
    const { getByText, rerender } = setup({
      active: 1,
      onFinish,
      content: [
        <Text key="step1">Step 1</Text>,
        <Text key="step2">Step 2</Text>,
      ],
    });

    fireEvent.press(getByText("Confirmar Viagem"));

    expect(onFinish).toHaveBeenCalled();
  });

  test('should call onBack when "Voltar" button is pressed', () => {
    const onBack = jest.fn();
    const { getByText } = setup({
      active: 1,
      onBack,
      content: [
        <Text key="step1">Step 1</Text>,
        <Text key="step2">Step 2</Text>,
      ],
    });

    fireEvent.press(getByText("Voltar"));

    expect(onBack).toHaveBeenCalled();
  });

  test("should not render buttons when showButton is false", () => {
    const { queryByTestId, queryByText } = setup({ showButton: false });

    expect(queryByTestId("continueButton")).toBeNull();
    expect(queryByText("Confirmar Viagem")).toBeNull();
    expect(queryByText("Voltar")).toBeNull();
  });
});
