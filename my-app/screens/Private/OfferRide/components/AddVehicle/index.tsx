import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddV = () => {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [veiculos, setVeiculos] = useState<{ modelo: string; placa: string; capacidade: string; }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number | null>(null);

  const saveSelectedVehicleIndex = async (index: number | null) => {
    try {
      await AsyncStorage.setItem('selectedVehicleIndex', JSON.stringify(index));
    } catch (error) {
      console.error('Erro ao salvar o índice do veículo selecionado:', error);
    }
  };

  const loadSelectedVehicleIndex = async () => {
    try {
      const index = await AsyncStorage.getItem('selectedVehicleIndex');
      if (index !== null) {
        setSelectedVehicleIndex(parseInt(index));
      }
    } catch (error) {
      console.error('Erro ao carregar o índice do veículo selecionado:', error);
    }
  };

  useEffect(() => {
    loadSelectedVehicleIndex();
  }, []);

  const handleAddVehicle = () => {
    if (!modelo || !placa || !capacidade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const newVehicle = {
      modelo,
      placa,
      capacidade,
    };
    setVeiculos([...veiculos, newVehicle]);
    setModelo('');
    setPlaca('');
    setCapacidade('');
    setShowModal(false);
  };

  const toggleSelectVehicle = (index: number) => {
    if (selectedVehicleIndex === index) {
      setSelectedVehicleIndex(null);
      saveSelectedVehicleIndex(null);
    } else {
      setSelectedVehicleIndex(index);
      saveSelectedVehicleIndex(index);
    }
  };

  const deleteVehicle = (index: number) => {
    const updatedVehicles = [...veiculos];
    updatedVehicles.splice(index, 1);
    setVeiculos(updatedVehicles);
    if (selectedVehicleIndex === index) {
      setSelectedVehicleIndex(null);
      saveSelectedVehicleIndex(null);
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
          {veiculos.map((veiculo, index) => (
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
                style={{
                  backgroundColor: selectedVehicleIndex === index ? '#3F51B5' : '#f0f0f0',
                  marginBottom: 10,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => toggleSelectVehicle(index)}
                onLongPress={() => setSelectedVehicleIndex(null)}
              >
                <Text>{veiculo.modelo}</Text>
                <Text>{veiculo.placa}</Text>
                <Text>{veiculo.capacidade}</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Capacidade de passageiros"
              keyboardType="numeric"
              value={capacidade}
              onChangeText={setCapacidade}
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
});

export default AddV;
