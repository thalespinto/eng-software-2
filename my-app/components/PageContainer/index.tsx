import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { View } from "react-native";

const PageContainer = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        width: "100%",
        height: "100%",
        padding: 5,
      }}
    >
      {children}
    </View>
  );
};

export default PageContainer;
