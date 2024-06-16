import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { api, getUserVehicles, deleteUserVehicle } from "../../../../../server/api";
import { userContext } from "../../../../../Providers/UserProvider";
import { RideContext } from "../../Provider/RideProvider";
import { ICar } from "../../../../../interfaces/ICar";

const AddVehicle = () => {
  // Estados locais para armazenar o modelo, placa, visibilidade do modal e índice do veículo selecionado
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState<ICar[]>([]);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number | null>(null);
  const userInfos = useContext(userContext);
  const rideContext = useContext(RideContext);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const userId = userInfos?.user?.id;
      if (userId) {
        const vehiclesData = await getUserVehicles(userId);
        setVehicles(vehiclesData);
      } else {
        throw new Error("User ID is undefined");
      }
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      Alert.alert("Erro ao carregar veículos");
    }
  };

  const handleAddVehicle = async () => {

    if (!modelo || !placa) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userId = userInfos?.user?.id;
      if (userId) {
        await api.post("/vehicle/create", { modelo, placa, id_usuario: userId });

        Alert.alert("Veículo cadastrado com sucesso!");
        fetchVehicles();
        setModelo('');
        setPlaca('');
        setShowModal(false);
      } else {
        throw new Error("User ID is undefined");
      }
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Alert.alert("Erro ao cadastrar veículo");
    }
  };

  const deleteVehicle = async (index: number) => {
    try {
      const vehicleId = vehicles[index].id;
      await deleteUserVehicle(vehicleId);

      Alert.alert("Veículo deletado com sucesso!");
      fetchVehicles();
    } catch (error) {
      console.error("Erro ao deletar veículo:", error);
      Alert.alert("Erro ao deletar veículo");
    }
  };

  // Função para alternar a seleção de um veículo na lista
  const toggleSelectVehicle = (index: number) => {
    if (index === selectedVehicleIndex) {
      setSelectedVehicleIndex(null);
      rideContext?.setSelectedVehicle(null);
    } else {
      setSelectedVehicleIndex(index);
      rideContext?.setSelectedVehicle(vehicles[index]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="blue" />
        <Text style={styles.addButtonText}>Adicionar Veículo</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          {vehicles.map((vehicle, index) => (
            <Swipeable
              key={index}
              renderRightActions={() => (
                <TouchableOpacity onPress={() => deleteVehicle(index)}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              )}
              onSwipeableRightWillOpen={() => deleteVehicle(index)}
            >
              <TouchableOpacity
                style={[
                  styles.vehicleItem,
                  selectedVehicleIndex === index && styles.selectedVehicleItem,
                ]}
                onPress={() => toggleSelectVehicle(index)}
              >
                <Text>{vehicle.modelo}</Text>
                <Text>{vehicle.placa}</Text>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </View>
      </ScrollView>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Veículo</Text>
            <TextInput
              style={styles.input}
              placeholder="Modelo do Veículo"
              value={modelo}
              onChangeText={setModelo}
            />
            <TextInput
              style={styles.input}
              placeholder="Placa do Veículo"
              value={placa}
              onChangeText={setPlaca}
            />
            <TouchableOpacity onPress={handleAddVehicle} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar Veículo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.modalButton, styles.cancelButton]}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    marginLeft: 5,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  vehicleItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  selectedVehicleItem: {
    backgroundColor: 'blue',
  },
});

export default AddVehicle;

