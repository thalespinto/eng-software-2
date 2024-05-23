import { Button, Dialog, useTheme, Input, Icon } from "@rneui/themed";
import { View } from "react-native";
import Text from "../../../../../components/Text";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { useRef, useState } from "react";

interface IRescheduleRideDialog {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const RescheduleRideDialog = ({
  isVisible,
  onBackdropPress,
}: IRescheduleRideDialog) => {
  const { theme } = useTheme();

  const [date, setDate] = useState<Date>(new Date());
  const [date2, setDate2] = useState<Date>(new Date());

  const dateInputRef = useRef<any>(null);
  const dateInputRef2 = useRef<any>(null);

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate!);
  };

  const onDateChange2 = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate2 = selectedDate;
    setDate2(currentDate2!);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
    });
  };
  const showDatePicker2 = () => {
    DateTimePickerAndroid.open({
      value: date2!,
      onChange: onDateChange2,
      is24Hour: true,
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
      mode: "time",
    });
  };

  const showTimePicker2 = () => {
    DateTimePickerAndroid.open({
      value: date2!,
      onChange: onDateChange2,
      is24Hour: true,
      mode: "time",
    });
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={{ marginTop: 20 }}>
        <Text variant="Subtitle">Ida:</Text>
        <Input
          ref={dateInputRef}
          label="Dia"
          value={formatDate(date)}
          onPressIn={showDatePicker}
        />
        <Input
          ref={dateInputRef}
          label="Hora"
          value={formatTime(date)}
          onPressIn={showTimePicker}
        />
        <Text variant="Subtitle">Retorno:</Text>
        <Input
          ref={dateInputRef2}
          label="Dia"
          value={formatDate(date2)}
          onPressIn={showDatePicker2}
        />
        <Input
          ref={dateInputRef2}
          label="Hora"
          value={formatTime(date2)}
          onPressIn={showTimePicker2}
        />
        <Button
          buttonStyle={{ marginTop: 10 }}
          onPress={onBackdropPress}
          color="secondary"
          uppercase
        >
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Confirmar
          </Text>
        </Button>
        <Button
          buttonStyle={{ marginTop: 10 }}
          onPress={onBackdropPress}
          color="warning"
          uppercase
        >
          <Text variant="Action" style={{ color: theme.colors.white }}>
            Voltar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
};

export default RescheduleRideDialog;
