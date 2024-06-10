import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '@rneui/themed';
import { RideContext as rc } from "../../Provider/RideProvider"; // Importe o contexto

const PassengerScreen = () => {
  const RideContext = useContext(rc);
  const [passengerCount, setPassengerCount] = useState('');
  const passengerInputRef = useRef<any>(null);

  useEffect(() => {
    if (RideContext) {
      setPassengerCount(RideContext.RideInfos.passengerCount ?? '');
    }
  }, [RideContext]);

  const updatePassengerCount = (count: string) => {
    if (RideContext) {
      RideContext.setPassengerCount(count);
    }
    setPassengerCount(count);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 40}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
        <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Por favor, insira o número de passageiros</Text>
        <Input
          ref={passengerInputRef}
          style={{ width: '100%', height: 40, paddingHorizontal: 10, marginBottom: 10 }}
          placeholder="Número de Passageiros"
          onChangeText={updatePassengerCount}
          value={passengerCount}
          keyboardType="numeric"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PassengerScreen;
