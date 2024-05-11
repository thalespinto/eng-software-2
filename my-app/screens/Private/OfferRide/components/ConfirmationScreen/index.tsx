import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { hikeContext as hc } from "../../Provider/RideProvider"; // Importe o contexto

const ConfirmationScreen = () => {
  const hikeContext = useContext(hc);

  // Verifica se o contexto está definido e se as informações da viagem foram fornecidas
  const passengerCount = hikeContext ? hikeContext.hikeInfos.passengerCount : '';
  const cnhNumber = hikeContext ? hikeContext.hikeInfos.cnh : '';
  const vehicles = hikeContext ? hikeContext.vehicles : [];
  const date = hikeContext ? hikeContext.hikeInfos.date : '';
  const formattedDate = date ? new Date(date) : '';

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Confirmação da Viagem
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número da CNH:</Text>
        <Text style={styles.info}>{cnhNumber}</Text>
      </View>
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
            <Text style={styles.vehicleInfo}>Capacidade: {vehicle.capacidade}</Text>
          </View>
        ))}
      </View>
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
});

export default ConfirmationScreen;
