import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import PageContainer from "../../../../../components/PageContainer";
import { Input } from "@rneui/themed";
import { useContext, useEffect, useRef, useState } from "react";
import { hikeContext as hc } from "../../Provider/HikeProvider";
import { dateMinusXhours } from "../../../../../utils/dateMinusThree";

const DateScreen = () => {
  const hikeContext = useContext(hc);

  // Estado local para armazenar a data da caminhada, inicializando com a data do contexto de caminhada ou a data atual se não estiver definida
  const [date, setDate] = useState<Date>(
    hikeContext?.hikeInfos.date ? hikeContext.hikeInfos.date : new Date()
  );

  // Referência para o input de data, utilizado para interação com o componente DateTimePicker
  const dateInputRef = useRef<any>(null);

  // Função chamada quando a data é alterada no DateTimePicker
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate!);
  };

  // Abre o DateTimePicker para seleção de data
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
    });
  };

  // Abre o DateTimePicker para seleção de hora
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
      mode: "time",
    });
  };

  // Formata a data no formato dd/mm/yyyy
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Formata o horário no formato hh:mm
  function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  // Efeito colateral que atualiza as informações de caminhada no contexto sempre que a data é alterada
  useEffect(() => {
    hikeContext?.setHikeInfos((prevState) => ({ ...prevState, date: dateMinusXhours(date, 3) }));
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
