import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { RideContext as rc } from "../../Provider/RideProvider";

const ConfirmationScreen = () => {
  const RideContext = useContext(rc);
  const [acceptAutomatically, setAcceptAutomatically] = useState(false);
  const [radius, setRadius] = useState('');

  const passengerCount = RideContext ? RideContext.RideInfos.passengerCount : '';
  const selectedVehicle = RideContext ? RideContext.selectedVehicle : null;
  const date = RideContext ? RideContext.RideInfos.date : '';
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

  const handleSubmit = async () => {
    if (RideContext) {
      await RideContext.submitRide();
    }
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
        {selectedVehicle ? (
          <View style={styles.vehicleInfoContainer}>
            <Text style={styles.vehicleInfo}>Modelo: {selectedVehicle.modelo}</Text>
            <Text style={styles.vehicleInfo}>Placa: {selectedVehicle.placa}</Text>
          </View>
        ) : (
          <Text style={styles.info}>Nenhum veículo selecionado</Text>
        )}
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Aceitar automaticamente passageiros:</Text>
        <Switch
          value={acceptAutomatically}
          onValueChange={(value) => {
            setAcceptAutomatically(value);
            RideContext?.setAcceptAutomatically(value);
          }}
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
            onChangeText={(text) => {
              setRadius(text);
              RideContext?.setRadius(text);
            }}
          />
        </View>
      )}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Confirmar Viagem</Text>
      </TouchableOpacity>
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
  submitButton: {
    backgroundColor: '#1976d2',
    width: '100%',
    padding: 4,
    marginTop: 60,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ConfirmationScreen;
