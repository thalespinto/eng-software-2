import { ThemeProvider } from "@rneui/themed";
import Text from ".";
import { render, screen } from "@testing-library/react-native";
import { theme } from "../../styles/theme";
import { StyleProp, TextStyle } from "react-native";

interface ITextVariants {
  action: StyleProp<TextStyle>;
  body: StyleProp<TextStyle>;
  menu: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  message: StyleProp<TextStyle>;
}

describe("Text", () => {
  const variants: Array<
    "Action" | "Body" | "Menu" | "Title" | "Subtitle" | "Message"
  > = ["Action", "Body", "Menu", "Title", "Subtitle", "Message"];

  const textVariants: ITextVariants = {
    action: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#2D3F56",
    },
    body: {
      fontSize: 18,
      color: "#2D3F56",
    },
    menu: {
      fontSize: 18,
      color: "#2D3F56",
    },
    title: {
      fontSize: 32,
      color: "#2D3F56",
      fontWeight: "600",
    },
    subtitle: {
      fontSize: 24,
      color: "#2D3F56",
      fontWeight: "600",
    },
    message: {
      fontSize: 14,
      color: "#2D3F56",
    },
  };

  variants.forEach((variant) =>
    it(`should render ${variant} syles correctly`, () => {
      render(
        <ThemeProvider theme={theme}>
          <Text variant={variant}>Teste</Text>
        </ThemeProvider>
      );
      expect(screen.getByText("Teste").props.style).toContainEqual(
        textVariants[variant.toLowerCase() as keyof ITextVariants]
      );
    })
  );
});
