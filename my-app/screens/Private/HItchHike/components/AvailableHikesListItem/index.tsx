import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import Text from "../../../../../components/Text";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

interface IAvailableHikesListItem {
  onPress: () => void;
}

const AvailableHikesListItem = ({ onPress }: IAvailableHikesListItem) => {
  const { theme } = useTheme();

  return (
    <>
      <TouchableOpacity
        style={{
          borderWidth: 0.2,
          borderRadius: 4,
          margin: 10,
          padding: 10,
          backgroundColor: theme.colors.primary,
        }}
        onPress={onPress}
      >
        <Icon name="commute" style={{ alignSelf: "flex-start" }} size={32} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>Fulano de tal</Text>
          <Text>123 caronas oferecidas</Text>
          <Rating
            imageSize={32}
            readonly
            startingValue={3.5}
            tintColor={theme.colors.primary}
          />
          <Text>21/12/2024 - 19:00</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AvailableHikesListItem;
