import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Switch, TextInput } from 'react-native';
import { RideContext as rc } from "../../Provider/RideProvider";

const ConfirmationScreen = () => {
  // Obtém o contexto de passeio da aplicação
  const RideContext = useContext(rc);

  // Estado local para armazenar se aceita automaticamente, inicializado como falso
  const [acceptAutomatically, setAcceptAutomatically] = useState(false);

  // Estado local para armazenar o raio, inicializado como uma string vazia
  const [radius, setRadius] = useState('');

  // Obtém o número de passageiros do contexto de passeio, ou uma string vazia se não existir
  const passengerCount = RideContext ? RideContext.RideInfos.passengerCount : '';

  // Obtém os veículos do contexto de passeio, ou um array vazio se não existir
  const vehicles = RideContext ? RideContext.vehicles : [];

  // Obtém a data do contexto de passeio, ou uma string vazia se não existir
  const date = RideContext ? RideContext.RideInfos.date : '';

  // Converte a string de data em um objeto Date
  const formattedDate = date ? new Date(date) : '';

  // Função para formatar a data no formato dd/mm/aaaa
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Função para formatar a hora no formato hh:mm
  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação da Viagem</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.info}>{formattedDate ? formatDate(formattedDate) : ''}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.info}>{formattedDate ? formatTime(formattedDate) : ''}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número de Passageiros:</Text>
        <Text style={styles.info}>{passengerCount}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Veículo:</Text>
        {vehicles.map((vehicle, index) => (
          <View key={index} style={styles.vehicleInfoContainer}>
            <Text style={styles.vehicleInfo}>Modelo: {vehicle.modelo}</Text>
            <Text style={styles.vehicleInfo}>Placa: {vehicle.placa}</Text>
          </View>
        ))}
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Aceitar automaticamente passageiros:</Text>
        <Switch
          value={acceptAutomatically}
          onValueChange={(value) => setAcceptAutomatically(value)}
        />
      </View>
      {acceptAutomatically && (
        <View style={styles.radiusContainer}>
          <Text style={styles.radiusLabel}>Raio em quilômetros:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o raio"
            keyboardType="numeric"
            value={radius}
            onChangeText={setRadius}
          />
        </View>
      )}
      {/* Outras informações de confirmação podem ser adicionadas aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center', 
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, 
    textAlign: 'left',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
  },
  vehicleInfoContainer: {
    marginLeft: 10,
    textAlign: 'left',
  },
  vehicleInfo: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radiusContainer: {
    marginTop: 10,
  },
  radiusLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ConfirmationScreen;
