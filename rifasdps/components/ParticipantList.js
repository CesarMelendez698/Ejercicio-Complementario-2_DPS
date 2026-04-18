import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ParticipantList = ({ participantes, ganador, alSeleccionarGanador, alReiniciar, alEliminar, alEditar }) => {
  return (
    <View style={styles.contenedorLista}>
      <FlatList
        data={participantes}
        keyExtractor={(item, indice) => indice.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.itemLista, item === ganador && styles.itemGanador]}>
            <Text style={item === ganador ? styles.textoGanador : styles.textoComun}>
              {item} {item === ganador ? 'Ganador' : ''}
            </Text>
            
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => alEditar(index)} style={styles.botonEditar}>
                <Text style={styles.textoBoton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alEliminar(index)} style={styles.botonEliminar}>
                <Text style={styles.textoBoton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vacio}>Sin participantes</Text>}
      />

      <View style={styles.controlesFinales}>
        <Button title="Seleccionar ganador" onPress={alSeleccionarGanador} color="#4CAF50" />
        <View style={{ height: 10 }} />
        <Button title="Reiniciar rifa" onPress={alReiniciar} color="#F44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorLista: { flex: 1 },
  itemLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  itemGanador: { backgroundColor: '#d4edda', borderWidth: 1, borderColor: '#28a745' },
  textoGanador: { fontWeight: 'bold', color: '#155724' },
  textoComun: { fontSize: 16 },
  acciones: { flexDirection: 'row' },
  botonEditar: { marginRight: 15 },
  vacio: { textAlign: 'center', marginTop: 20, color: '#999' },
  controlesFinales: { paddingVertical: 20 },
});

export default ParticipantList;