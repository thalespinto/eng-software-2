import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '@rneui/themed';

const CNHScreen = () => {
  const [cnhNumber, setCNHNumber] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 40}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
        <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Primeiro precisamos confirmar sua carteira de habilitação</Text>
        <Input
          style={{ width: '100%', height: 40, paddingHorizontal: 10, marginBottom: 10 }}
          placeholder="Nº da Carteira de Habilitação"
          onChangeText={setCNHNumber}
          value={cnhNumber}
          keyboardType="numeric"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CNHScreen;

