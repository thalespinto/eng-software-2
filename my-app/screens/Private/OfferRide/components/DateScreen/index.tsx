import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import PageContainer from "../../../../../components/PageContainer";
import { Input } from "@rneui/themed";
import { useContext, useEffect, useRef, useState } from "react";
import { RideContext as rc } from "../../Provider/RideProvider";

const DateScreen = () => {
  // Obtém o contexto de passeio da aplicação
  const RideContext = useContext(rc);

  // Estado local para armazenar a data do passeio, inicializado com a data do contexto ou a data atual
  const [date, setDate] = useState<Date>(
    RideContext?.RideInfos.date
      ? new Date(RideContext.RideInfos.date)
      : new Date()
  );

  // Referência para o input de data
  const dateInputRef = useRef<any>(null);

  // Função para atualizar o estado local com a data selecionada
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate!);
  };

  // Abre o seletor de data nativo do Android
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
    });
  };

  // Abre o seletor de hora nativo do Android
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange: onDateChange,
      is24Hour: true,
      mode: "time",
    });
  };

  // Formata a data para o formato dd/mm/aaaa
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Formata a hora para o formato hh:mm
  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // Efeito que atualiza o contexto de passeio com a nova data selecionada
  useEffect(() => {
    RideContext?.setRideInfos((prevState) => ({ ...prevState, date }));
  }, [date]);

  return (
    <>
      <PageContainer>
        <Input
          testID="dayInput"
          ref={dateInputRef}
          label="Dia"
          value={formatDate(date)}
          onPressIn={showDatePicker}
        />
        <Input
          testID="timeInput"
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
