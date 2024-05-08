import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

const PageContainer = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.white,
        padding: 5,
        paddingTop: 50,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default PageContainer;
