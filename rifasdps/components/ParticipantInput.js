import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ParticipantInput = ({ alAgregarParticipante }) => {
  const [nombre, setNombre] = useState('');

  const manejarAgregar = () => {
    if (nombre.trim().length === 0) {
      Alert.alert('Atención', 'Ingresa un nombre válido.');
      return;
    }
    alAgregarParticipante(nombre);
    setNombre('');
  };

  return (
    <View style={styles.contenedorInput}>
      <TextInput
        placeholder="Nombre del participante"
        style={styles.entrada}
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Agregar" onPress={manejarAgregar} color="#2196F3" />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  entrada: {
    width: '70%',
    borderBottomColor: '#3b5998',
    borderBottomWidth: 1,
    padding: 5,
  },
});

export default ParticipantInput;