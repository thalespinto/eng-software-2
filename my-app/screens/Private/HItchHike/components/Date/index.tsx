import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import PageContainer from "../../../../../components/PageContainer";
import { Input } from "@rneui/themed";
import { useRef, useState } from "react";

const RideDate = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dateInputRef = useRef<any>(null);

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate;
    console.log(selectedDate);
    setDate(currentDate!);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
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
    <>
      <PageContainer>
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
      </PageContainer>
    </>
  );
};

export default RideDate;
