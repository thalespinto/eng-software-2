import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import PageContainer from "../../../../../components/PageContainer";
import { Input } from "@rneui/themed";
import { useContext, useEffect, useRef, useState } from "react";
import { hikeContext as hc } from "../../Provider/RideProvider";
import { dateMinusXhours } from "../../../../../utils/dateMinusThree";

const DateScreen = () => {
  const hikeContext = useContext(hc);

  const [date, setDate] = useState<Date>(
    hikeContext?.hikeInfos.date ? hikeContext.hikeInfos.date : new Date()
  );

  const dateInputRef = useRef<any>(null);

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate;
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

  useEffect(() => {
    hikeContext?.setHikeInfos((prevState) => ({ ...prevState, date: dateMinusXhours(date, 0) }));
  }, [date]);

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

export default DateScreen;
