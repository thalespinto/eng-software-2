import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { Text as RNText, StyleProp, TextProps, TextStyle } from "react-native";

interface ITextVariants {
  actions: StyleProp<TextStyle>;
  body: StyleProp<TextStyle>;
  menu: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  messages: StyleProp<TextStyle>;
}

interface IText extends TextProps {
  children: ReactNode;
  variant?: "Action" | "Body" | "Menu" | "Title" | "Subtitle" | "Message";
}

const Text = ({ children, variant, ...props }: IText) => {
  const { theme } = useTheme();

  const textVariants: ITextVariants = {
    actions: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.black,
    },
    body: {
      fontSize: 18,
      color: theme.colors.black,
    },
    menu: {
      fontSize: 18,
      color: theme.colors.black,
    },
    title: {
      fontSize: 32,
      color: theme.colors.black,
      fontWeight: "600",
    },
    subtitle: {
      fontSize: 24,
      color: theme.colors.black,
      fontWeight: "600",
    },
    messages: {
      fontSize: 14,
      color: theme.colors.black,
    },
  };

  let textStyle;

  switch (variant) {
    case "Action":
      textStyle = textVariants.actions;
      break;
    case "Body":
      textStyle = textVariants.body;
      break;
    case "Menu":
      textStyle = textVariants.menu;
      break;
    case "Title":
      textStyle = textVariants.title;
      break;
    case "Subtitle":
      textStyle = textVariants.subtitle;
      break;
    case "Message":
      textStyle = textVariants.messages;
      break;
    default:
      textStyle = textVariants.body;
      break;
  }

  return (
    <RNText {...props} style={[textStyle, props?.style]}>
      {children}
    </RNText>
  );
};

export default Text;
