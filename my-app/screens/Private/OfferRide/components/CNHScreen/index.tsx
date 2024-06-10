import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '@rneui/themed';
import { RideContext as rc } from "../../Provider/RideProvider"; // Importe o contexto

const CNHScreen = () => {
  const RideContext = useContext(rc); // Corrigido para useContext(hc)
  const [cnhNumber, setCNHNumber] = useState('');
  const cnhInputRef = useRef<any>(null);

  useEffect(() => {
    if (RideContext) {
      setCNHNumber(RideContext.RideInfos.cnh ?? ''); // Define o número da CNH a partir do contexto
    }
  }, [RideContext]);

  const updateCNH = (cnh: string) => {
    if (RideContext) {
      RideContext.setCNH(cnh); // Utiliza a função setCNH do contexto para atualizar a CNH
    }
    setCNHNumber(cnh);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 40}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
        <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Primeiro precisamos confirmar sua carteira de habilitação</Text>
        <Input
          ref={cnhInputRef}
          style={{ width: '100%', height: 40, paddingHorizontal: 10, marginBottom: 10 }}
          placeholder="Nº da Carteira de Habilitação"
          onChangeText={updateCNH}
          value={cnhNumber}
          keyboardType="numeric"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CNHScreen;
